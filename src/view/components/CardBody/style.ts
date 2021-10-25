import { makeStyles } from '@material-ui/core';
import {
  blackColor,
  whiteColor,
  hexToRgb,
} from '../../../configs/variables';

export const useStyles = makeStyles((theme) => ({
  cardBody: {
    padding: "0.9375rem 20px",
    flex: "1 1 auto",
    // WebkitBoxFlex: "1",
    position: "relative",
  },
  cardBodyPlain: {
    paddingLeft: "5px",
    paddingRight: "5px",
  },
  cardBodyProfile: {
    marginTop: "15px",
  },
}));
