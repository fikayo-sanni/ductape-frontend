import React from "react";
import { Spin } from "antd";

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
  let allRow = [];
  let rowItems = [];
  let isNewRow = false;
  data.forEach((element, index) => {
    isNewRow = index % itemsPerRow === 0 ? true : false;
    if (isNewRow && rowItems.length > 0) {
      // Push
      allRow.push([...rowItems]);
      // Reset
      rowItems = [];
      rowItems.push({ ...element });
    } else {
      rowItems.push({ ...element });
    }
  });
  if (rowItems.length > 0) {
    allRow.push([...rowItems]);
  }
  return allRow;
};

export const Logo = (props) => {
  return (
    <h2 className="text-primary mb-0 text-center font-lg font-weight-900 text-uppercase">
      Duc<span className=" font-lg text-danger">Tape</span>
    </h2>
    // <img src="/images/logo.svg" className={"w-max-200" + props.className}/>
  );
};

function fetchInitials(firstname, lastname) {
  if (firstname && lastname) {
    return `${firstname.charAt(0)} ${lastname.charAt(0)}`;
  } else if (firstname) {
    return `${firstname.charAt(0)}`;
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
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function tagify(str) {
  return str.replace(/[^A-Z0-9]/gi, "_").toUpperCase();
}

function tagifyIgnoreCase(str) {
  return str.replace(/[^A-Z0-9]/gi, "_");
}

function uniqueCheck(arr, data) {
  const found = arr.some((el) => el._id === data._id);
  return !found;
}

function resourcify(str) {
  if (!str.startsWith("/")) str = `/${str}`;
  return str.replace(/[^A-Z0-9:]/gi, "/");
}

function Parameterize(URL, datapoint, replacement) {
  return URL.replace(datapoint, replacement);
}

function cleanFields(array) {
  const arr = [];

  for (let i = 0; i < array.length; i++) {
    const obj = array[i];
    const isEmpty = Object.values(obj).every((x) => x === null || x === "");

    if (!isEmpty) arr.push(obj);
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

const jsonToFields = (d) => {
  let data = d;
  if (Array.isArray(d) && d.length > 0) data = d[0];

  const fields = [];
  if (typeof data === "object" && data !== null) {
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      let type = typeof data[keys[i]];

      if (keys[i] && type === "object" && Array.isArray(d[keys[i]]))
        type = "array";
      fields.push({
        key: keys[i],
        sampleValue: data[keys[i]],
        //origin: "",
        description: "",
        required: true,
        maxLength: 0,
        minLength: 0,
        decorator: "",
        decoratorPosition: "",
        type,
        defaultType: "input",
        defaultValue: "",
      });
    }
  } else if (data !== null) {
    fields.push({
      key: keys[i],
      sampleValue: data,
      //origin: "",
      description: "",
      required: true,
      maxLength: 0,
      minLength: 0,
      decorator: "",
      decoratorPosition: "",
      type,
      defaultType: "input",
      defaultValue: "",
    });
  }

  // if(d.length>0)alert(JSON.stringify(keys))

  return fields;
};

const extractParams = (str) => {
  const arr = [];

  let found = false;
  let foundStr = "";

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "/") {
      if (foundStr) {
        arr.push(foundStr);
      }
      foundStr = "";
      found = false;
    }

    if (str[i] === ":") {
      found = true;
    }

    if (found && str[i] !== ":") foundStr = foundStr + str[i];

    if (found && i === str.length - 1) arr.push(foundStr);
  }

  const fields = [];
  for (let i = 0; i < arr.length; i++) {
    //alert(arr+" "+arr[i]);
    fields.push({
      key: arr[i],
      sampleValue: "",
      //origin: "",
      description: "",
      required: true,
      maxLength: 1,
      minLength: 1,
      decorator: "",
      decoratorPosition: "",
      type: "string",
      defaultType: "input",
      defaultValue: "",
    });
  }

  return fields;
};

const statusCodes = [
  {name: "Common Responses", code: ""},
  {name: "CONTINUE", code: 100},
  {name: "OK", code: 200},
  {name: "CREATED", code: 201},
  {name: "ACCEPTED", code: 202},
  {name: "MULTIPLECHOICES", code: 300},
  {name: "MOVED_PERMANENTLY", code: 301},
  {name: "FOUND", code: 302},
  {name: "NOT_MODIFIED", code: 304},
  {name: "BAD_REQUEST", code: 400},
  {name: "UNAUTHORIZED", code: 401},
  {name: "FORBIDDEN", code: 403},
  {name: "NOT_FOUND", code: 404},
  {name: "INTERNAL_SERVER_ERROR", code: 500},
  {name: "NOT_IMPLEMENTED", code: 501},
  {name: "BAD_GATEWAY", code: 502},
  {name: "SERVICE_UNAVAILABLE", code: 503},
  {name: "GATEWAY_TIMEOUT", code: 504},
  {name: "", code: ""},
  {name: "Informational Responses", code: ""},

  {name: "SWITCHING", code: 101},
  {name: "PROCESSING", code: 102},
  {name: "EARLY_HINTS", code: 103},
  {name: "", code: ""},
  
  {name: "Successful Responses", code: ""},
  {name: "NON_AUTHORIZED", code: 203},
  {name: "NO_CONTENT", code: 204},
  {name: "RESET_CONTENT", code: 205},
  {name: "PARTIAL_CONTENT", code: 206},
  {name: "MULTI_STATUS", code: 207},
  {name: "ALREADY_REPORTED", code: 208},
  {name: "IM_USED", code: 226},
  {name: "", code: ""},
  
  
  {name: "Redirection Responses", code: ""},
  {name: "SEE_OTHER", code: 303},
  {name: "", code: ""},
  {name: "", code: ""},
  {name: "USE_PROXY", code: 305},
  {name: "UNUSED", code: 306},
  {name: "TEMPORARY_REDIRECT", code: 307},
  {name: "PERMANENT_REDIRECT", code: 308},
  {name: "", code: ""},

  {name: "Client Error Responses", code: ""},
  {name: "PAYMENT_REQUIRED", code: 402},
  {name: "NOT_ALLOWED", code: 405},
  {name: "NOT_ACCEPTABLE", code: 406},
  {name: "PROXY_AUTH_REQUIRED", code: 407},
  {name: "REQUEST_TIMEOUT", code: 408},
  {name: "CONFLICT", code: 409},
  {name: "GONE", code: 410},
  {name: "LENGTH_REQUIRED", code: 411},
  {name: "PRECONDITION_FAILED", code: 412},
  {name: "PAYLOAD_TOO_LARGE", code: 413},
  {name: "URI_TOO_LONG", code: 414},
  {name: "UNSUPPORTED_MEDIA_TYPE", code: 415},
  {name: "RANGE_NOT_SATISFIABLE", code: 416},
  {name: "EXPECTATION_FAILED", code: 417},
  {name: "TEAPOT", code: 418},
  {name: "MISDIRECTED_REQUEST", code: 421},
  {name: "UNPROCESSABLE_ENTITY", code: 422},
  {name: "LOCKED", code: 423},
  {name: "TOO_EARLY", code: 425},
  {name: "FAILED_DEPENDENCY", code: 424},
  {name: "UPGRADE_REQUIRED", code: 426},
  {name: "PRECONDITION_REQUIRED", code: 428},
  {name: "TOO_MANY_REQUESTS", code: 429},
  {name: "HEADER_TOO_LARGE", code: 431},
  {name: "LEGAL_EXCEPTION", code: 451},
  {name: "", code: ""},

  {name: "Internal Server Error Responses", code: ""},

  {name: "HTTP_VERSION_NOT_SUPPORTED", code: 505},
  {name: "VARIANT_ALSO_NEGOTIATES", code: 506},
  {name: "INSUFFICIENT_STORAGE", code: 507},
  {name: "LOOP_DETECTED", code: 508},
  {name: "NOT_EXTENDED", code: 510},
  {name: "NETWORK_AUTH_REQUIRED", code: 511}
]

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
  tagifyIgnoreCase,
  resourcify,
  uniqueCheck,
  jsonToFields,
  extractParams,
  statusCodes
};
