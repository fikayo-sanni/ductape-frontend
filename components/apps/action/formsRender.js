const subQuery = (data, index, type) => {
  // alert(JSON.stringify(data));
  return data.map((d, i) => {
    //alert(JSON.stringify(d))
    return <FormsRender index={i} type={type} data={d} />;
    // return FormsRender(i, type, d);
  });
};

const FormsRender = (props) => {
  const { index, type, data } = props;
  const valueCheck = data.sampleValue;

  /**const Headers = headers.map((data, index) => {
    // alert(JSON.stringify(data))
    return formsRender(index, "headers", data);
  });

  const Params = params.map((data, index) => {
    return formsRender(index, "params", data);
  });

  const Query = query.map((data, index) => {
    return formsRender(index, "query", data);
  });

  const Body = body.map((data, index) => {
    return formsRender(index, "body", data);
  });

  const Response = response.map((data, index) => {
    return formsRender(index, "response", data);
  });*/

  const handleKeyPress = (index, e, type) => {
    //alert(type)
    if (type === "headers") {
      if (index === headers.length - 1) {
        setHeaders([...headers, { ...defaultFields }]);
      }
    } else if (type === "params") {
      if (index === params.length - 1) {
        setParams([...params, { ...defaultFields }]);
      }
    } else if (type === "body") {
      if (index === body.length - 1) {
        setBody([...body, { ...defaultFields }]);
      }
    } else if (type === "query") {
      if (index === query.length - 1) {
        setQuery([...query, { ...defaultFields }]);
      }
    } else if (type === "response") {
      if (index === response.length - 1) {
        setResponse([...response, { ...defaultFields }]);
      }
    }
  };

  return (
    <div>
      <div className="row m-1">
        <div className="col-4">
          <div className="form-floating w-90">
            <input
              type="text"
              value={data.key}
              required
              className="form-control"
              placeholder="key"
              onKeyPress={(e) => {
                handleKeyPress(index, e, type);
              }}
              name="key"
            />
            <label>Key</label>
          </div>
        </div>
        {typeof valueCheck !== "object" ? (
          <div className="col-4">
            <div className="form-floating w-90">
              <input
                type="text"
                value={data.value}
                required
                className="form-control"
                onKeyPress={(e) => {
                  handleKeyPress(index, e, type);
                }}
                placeholder="Value"
                name="value"
              />
              <label>Value</label>
            </div>
          </div>
        ) : (
          <label className="col-3 mt-3 text-primary text-capitalize">
            {data.type}
          </label>
        )}
        {typeof valueCheck !== "object" ? (
          <div className="col-4">
            <div className="form-floating  w-90">
              <input
                type="text"
                value={data.description}
                required
                className="form-control"
                placeholder="description"
                onKeyPress={(e) => {
                  handleKeyPress(index, e, type);
                }}
                name="key"
              />
              <label>Description</label>
            </div>
          </div>
        ) : null}
      </div>
      {typeof valueCheck === "object" ? (
        <div className="row">
          <div className="col-1"></div>
          <div className="col-11 border-start">
            {subQuery(jsonToFields(valueCheck), index, type)}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FormsRender;
