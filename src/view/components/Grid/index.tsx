import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@mui/material/Grid';

const styles = {
  grid: {
    padding: "0 15px !important",
  },
};

const useStyles = makeStyles(styles);

export default function GridItem(props: any) {
  console.log(props)
  const classes = useStyles();
  const { children, ...rest } = props;
  return (
    <Grid xs={12} sm={12} md={4} item {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
}

GridItem.propTypes = {
  children: PropTypes.node,
};
