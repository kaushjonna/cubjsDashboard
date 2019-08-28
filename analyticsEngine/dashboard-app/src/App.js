import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Row, Col, Card, Layout, Spin, Statistic, Table } from "antd";
import "antd/dist/antd.css";
import "./index.css";
import cubejs from "@cubejs-client/core";
import { QueryRenderer } from "@cubejs-client/react";
import { Chart, Axis, Tooltip, Geom, Coord, Legend } from "bizcharts";
import moment from "moment";

const AppLayout = ({ children }) => (
  <Layout>
    <Layout.Header>
      <div
        style={{
          float: "left"
        }}
      >
        <h2
          style={{
            color: "#fff",
            margin: 0,
            marginRight: "1em"
          }}
        >
          My Dashboard
        </h2>
      </div>
    </Layout.Header>
    <Layout.Content
      style={{
        padding: "0 25px 25px 25px",
        margin: "25px"
      }}
    >
      {children}
    </Layout.Content>
  </Layout>
);

const Dashboard = ({ children }) => (
  <Row type="flex" justify="space-around" align="top" gutter={24}>
    {children}
  </Row>
);

const DashboardItem = ({ children, title }) => (
  <Col span={24} lg={12}>
    <Card
      title={title}
      style={{
        marginBottom: "24px"
      }}
    >
      {children}
    </Card>
  </Col>
);

const API_URL = "http://localhost:4000";
const cubejsApi = cubejs(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjY4NDQ0MzcsImV4cCI6MTU2NjkzMDgzN30.ZaTr6XFez0ZcELpe9s30iewFbBcEsofpR1MoyUyQIxw",
  {
    apiUrl: API_URL + "/cubejs-api/v1"
  }
);

const renderChart = Component => ({ resultSet, error }) =>
  (resultSet && <Component resultSet={resultSet} />) ||
  (error && error.toString()) || <Spin />;

const pieRender = ({ resultSet }) => (
  <Chart height={400} data={resultSet.chartPivot()} forceFit>
    <Coord type="theta" radius={0.75} />
    {resultSet.seriesNames().map(s => (
      <Axis name={s.key} />
    ))}
    <Legend position="right" />
    <Tooltip />
    {resultSet.seriesNames().map(s => (
      <Geom type="intervalStack" position={s.key} color="category" />
    ))}
  </Chart>
);

const stackedChartData = resultSet => {
  const data = resultSet
    .pivot()
    .map(({ xValues, yValuesArray }) =>
      yValuesArray.map(([yValues, m]) => ({
        x: resultSet.axisValuesString(xValues, ", "),
        color: resultSet.axisValuesString(yValues, ", "),
        measure: m && Number.parseFloat(m)
      }))
    )
    .reduce((a, b) => a.concat(b));
  return data;
};

const lineRender = ({ resultSet }) => (
  <Chart
    scale={{
      x: {
        tickCount: 8
      }
    }}
    height={400}
    data={stackedChartData(resultSet)}
    forceFit
  >
    <Axis name="x" />
    <Axis name="measure" />
    <Tooltip
      crosshairs={{
        type: "y"
      }}
    />
    <Geom type="line" position={`x*measure`} size={2} color="color" />
  </Chart>
);

const barRender = ({ resultSet }) => (
  <Chart
    scale={{
      x: {
        tickCount: 8
      }
    }}
    height={400}
    data={stackedChartData(resultSet)}
    forceFit
  >
    <Axis name="x" />
    <Axis name="measure" />
    <Tooltip />
    <Geom type="intervalStack" position={`x*measure`} color="color" />
  </Chart>
);

function App() {
  return (
    <div className="App">
      <AppLayout>
        <Dashboard>
          <DashboardItem>
            <QueryRenderer
              query={{
                measures: ["Dataset.count"],
                timeDimensions: [
                  {
                    dimension: "Dataset.createtime"
                  }
                ],
                dimensions: ["Dataset.locationname"],
                filters: []
              }}
              cubejsApi={cubejsApi}
              render={renderChart(pieRender)}
            />
          </DashboardItem>
          <DashboardItem>
            <QueryRenderer
              query={{
                measures: ["Dataset.count"],
                timeDimensions: [
                  {
                    dimension: "Dataset.createtime",
                    granularity: "day"
                  }
                ],
                filters: []
              }}
              cubejsApi={cubejsApi}
              render={renderChart(lineRender)}
            />
          </DashboardItem>
          <DashboardItem>
            <QueryRenderer
              query={{
                measures: ["Dataset.count"],
                timeDimensions: [
                  {
                    dimension: "Dataset.createtime"
                  }
                ],
                dimensions: ["Dataset.conversiondate"],
                filters: []
              }}
              cubejsApi={cubejsApi}
              render={renderChart(barRender)}
            />
          </DashboardItem>
        </Dashboard>
      </AppLayout>
    </div>
  );
}

export default App;
