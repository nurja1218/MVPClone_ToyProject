import { ApolloClient, createHttpLink, concat } from '@apollo/react-hooks';
import cache from './memory.cache';
import { onError } from 'apollo-link-error';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from 'apollo-link-context';
import { getBackendPort, BACKEND_URI, ENDPOINT } from './client.cfg';
import {
    ACCESS_TOKEN_EXPIRE,
    INVALID_ACCESS_TOKEN,
    INVALID_REFRESH_TOKEN,
    REFRESH_TOKEN_EXPIRE,
} from './exceptions';
import { createNetworkStatusNotifier } from 'react-apollo-network-status';
import { Spin } from 'antd';

let client: any;

const { useApolloNetworkStatus, link: networkStatusNotifierLink }: any =
    createNetworkStatusNotifier();

function GlobalLoadingIndicator({ children }: any) {
    const { numPendingQueries, numPendingMutations }: any = useApolloNetworkStatus();

    return (
        <Spin size="large" spinning={numPendingQueries > 0 || numPendingMutations > 0}>
            {children}
        </Spin>
    );
}

const httpLink: any = (type: any) =>
    createHttpLink({
        uri: `${ENDPOINT}`,
        credentials: 'include',
    });

const authLink: any = (token: any) =>
    setContext((_, { headers }) => ({
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }));

const wsLink: any = (type: any, token: any) =>
    new WebSocketLink({
        uri: `wss://${BACKEND_URI}:${getBackendPort(type)}${ENDPOINT}`,
        options: {
            reconnect: true,
            reconnectionAttempts: 5,
            connectionParams: () => ({
                authorization: token ? `Bearer ${token}` : '',
            }),
        },
    });

/**
 * Hybrid Link (WebSocketLink / HttpLink)
 */
const link: any = (type: any, token: any) =>
    split(
        ({ query }) => {
            const { kind, operation }: any = getMainDefinition(query);
            return kind === 'OperationDefinition' && operation === 'subscription';
        },
        wsLink(type, token),
        networkStatusNotifierLink.concat(authLink(token).concat(httpLink(type))),
    );

/**
 * Global Error Handler (Auth)
 * Auto refetch tokens if token expired
 *
 * first JWT Exception after login -> refetch
 */
const linkOnError: any = (logout: any) =>
    onError(({ graphQLErrors: errors, operation, forward }) => {
        if (client && errors) {
            for (const error of errors) {
                if (error.message.includes(ACCESS_TOKEN_EXPIRE)) {
                    window.location.reload();
                    // const accessToken = fromPromise(RefreshToken());
                    // if (!accessToken) {
                    //     logout();
                    //     return;
                    // }
                    // const oldHeaders = operation.getContext().headers;
                    // operation.setContext({
                    //     headers: {
                    //         ...oldHeaders,
                    //         authorization: `Bearer ${accessToken}`,
                    //     },
                    // });
                    // return forward(operation);
                } else if (
                    error.message.includes(REFRESH_TOKEN_EXPIRE) ||
                    error.message.includes(INVALID_REFRESH_TOKEN) ||
                    error.message.includes(INVALID_ACCESS_TOKEN)
                ) {
                    logout();
                }
            }
        }
    });

/**
 * type: "company" | "root" | "guest"
 */
client = (type: any, accessToken: any, logout: any) =>
    new ApolloClient({
        link: concat(linkOnError(logout), link(type === 'root' ? 'root' : 'company', accessToken)),
        cache,
    });

export default client;
export { GlobalLoadingIndicator };
