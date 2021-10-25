import { makeStyles } from '@material-ui/core';
import {
  whiteColor,
  baseColor,
    hexToRgb,
    successColor,
    grayColor
  } from '../../../configs/variables';

export const useStyles = makeStyles((theme) => ({
  graphStyle: {
    "& .ct-series-a,& .ct-line": {
      stroke: 'rgb(56,116,203)',
      strokeWidth: '1px',
    },
    "& .ct-series-a,& .ct-point": {
      stroke: 'rgb(56,116,203)',
      strokeWidth: '5px',
    },
    "& .ct-series-a,& .ct-bar": {
      stroke: 'rgb(56,116,203)',
    },
    "& .ct-label": {
      color: 'black',
    },
    "& .ct-grid": {
      stroke: '#A8AEAF',
    },
    "& .ct-series-a,& .ct-slice-donut": {
      stroke: 'white',
    },
    "& .ct-series-a,& .ct-slice-pie": {
      stroke: 'white',
    },
    "& .ct-series-a,& .ct-area": {
      stroke: 'white',
    },
  },
  successText: {
    color: successColor[0],
  },
  upArrowCardCategory: {
    width: "16px",
    height: "16px",
  },
  stats: {
    color: grayColor[0],
    display: "inline-flex",
    fontSize: "12px",
    lineHeight: "22px",
    "& svg": {
      top: "4px",
      width: "16px",
      height: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px",
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      top: "4px",
      fontSize: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px",
    },
  },
  cardCategory: {
    color: grayColor[0],
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0",
  },
  cardCategoryWhite: {
    color: "rgba(" + hexToRgb(whiteColor) + ",.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitle: {
    color: grayColor[2],
    marginTop: "0px",
    minHeight: "auto",
  //   fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  cardTitleWhite: {
    color: whiteColor,
    marginTop: "0px",
    minHeight: "auto",
  //   fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  cardCategoryBasic: {
    color: baseColor,
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleBasic: {
    color: baseColor,
    marginTop: "0px",
    minHeight: "auto",
  //   fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1",
    },
  },
}));
  