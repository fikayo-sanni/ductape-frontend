import React, { Component, useState, useEffect } from "react";
import NProgress from "nprogress";
import moment from "moment";
import Swal from "sweetalert2";
import { Router, useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
let Parser = require("rss-parser");
let parser = new Parser();
import {
  Button,
  Card,
  message,
  Rate,
  Comment,
  Avatar,
  Typography,
  List,
  Progress,
  Tooltip,
  Menu,
  Tag,
  Radio,
  Popover,
  Empty,
  Spin,
} from "antd";
import Link from "next/link";
import {
  GlobalOutlined,
  AppstoreOutlined,
  ContainerOutlined,
  SolutionOutlined,
  DollarCircleOutlined,
  UnlockOutlined,
  TeamOutlined,
  GroupOutlined,
  LogoutOutlined,
  CheckCircleOutlined,
  FileWordOutlined,
  SettingOutlined,
  UserOutlined,
  WalletOutlined,
  FolderOpenOutlined,
  FunctionOutlined,
  HomeOutlined,
} from "@ant-design/icons";
const { Title } = Typography;
const { SubMenu } = Menu;

const Loading = () => {
  return (
    <div className="loading">
      <section className="padding_50 align-items-center justify-content-center text-center">
        <Spin size="large" />
      </section>
    </div>
  );
};

const getTotalRow = (data, itemsPerRow) => {
  let allRow = []
  let rowItems = []
  let isNewRow = false
  data.forEach((element, index) => {
    isNewRow = index % itemsPerRow === 0 ? true : false
    if (isNewRow && rowItems.length > 0) {
      // Push
      allRow.push([...rowItems])
      // Reset
      rowItems = []
      rowItems.push({ ...element })
    } else {
      rowItems.push({ ...element })
    }
  })
  if (rowItems.length > 0) {
    allRow.push([...rowItems])
  }
  return allRow
}

const Logo = (props) => {
  return (
    <h2 className="text-primary text-center font-lg font-weight-900 text-uppercase">
      Duc<span className=" font-lg text-danger">Tape</span>
    </h2>
    // <img src="/images/logo.svg" className={"w-max-200" + props.className}/>
  );
};

function fetchInitials(firstname, lastname) {
  if (firstname && lastname) {
    return `${firstname.charAt(0)} ${lastname.charAt(0)}`;
  }
}

function numFormatter(num, digits = 2) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}

function thousandSeparator(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + (str.slice(1)).toLowerCase();
}

function tagify(str) {
  return (str.replace(/[^A-Z0-9]/ig, "_")).toUpperCase();
}

function uniqueCheck(arr, data) {
  const found = arr.some(el => el._id === data._id);
  return !found
}

function resourcify(str) {
  if(!str.startsWith("/")) str = `/${str}`
  return str.replace(/[^A-Z0-9:]/ig, "/")
}

function Parameterize(URL, datapoint, replacement) {
  return URL.replace(datapoint, replacement);
}

function cleanFields(array) {
  const arr = [];

  for(let i=0; i< array.length; i++){
    const obj = array[i];
    const isEmpty = Object.values(obj).every(x => x === null || x === '');

    if(!isEmpty) arr.push(obj);
  }

  return arr;
}

function isValidHttpUrl(string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

module.exports = {
  Loading,
  Logo,
  numFormatter,
  thousandSeparator,
  fetchInitials,
  Parameterize,
  cleanFields,
  getTotalRow,
  capitalize,
  isValidHttpUrl,
  tagify,
  resourcify,
  uniqueCheck
};
