import { useEffect, useState } from "react";
import Head from "next/head";
import { IoHome } from "react-icons/io5";
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineController,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  const [blogsData, setBlogsData] = useState([]);

  ChartJS.register(
    CategoryScale,
    LineController,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Blogs Created Monthly by year",
      },
    },
  };

  useEffect(() => {
    //fetch data from api
    const fetchData = async () => {
      try {
        const response = await fetch("/api/blogapi");
        const data = await response.json();
        setBlogsData(data); // assuming data is an array of the blog objects
      } catch (error) {
        console.error("error fetching data", error);
      }
    };
    fetchData();
  }, []);

  // Aggregate data by year and month
  const monthlydata = blogsData
    .filter((dat) => dat.status === "publish")
    .reduce((acc, blog) => {
      const year = new Date(blog.createdAt).getFullYear(); // get the year
      const month = new Date(blog.createdAt).getMonth(); // get the month (0 indexed)
      acc[year] = acc[year] || Array(12).fill(0); // initailize array for the year if not exists
      acc[year][month]++; // increment count for the month
      return acc;
    }, {});

  const currentYear = new Date().getFullYear();
  const years = Object.keys(monthlydata);
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const datasets = years.map((year) => ({
    label: `${year}`,
    data: monthlydata[year] || Array(12).fill(0), // if no data for a month, default to 0
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.5)`,
  }));

  const data = {
    labels,
    datasets,
  };

  return (
    <ProtectedRoute>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="description" content="Admin Dashboard by Hamdi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="dashboard">
        {/* title dashboard */}
        <div className="titledashboard flex flex-sb">
          <div data-aos="fade-right">
            <h2>
              Blogs <span>Dashboard</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb" data-aos="fade-left">
            <IoHome /> <span>/</span> <span>Dashboard</span>
          </div>
        </div>
        {/* dashboard four cards */}
        <div className="topfourcards flex flex-sb">
          <div className="four_card" data-aos="fade-right">
            <h2>Total Blogs</h2>
            <span>
              {blogsData?.filter((ab) => ab.status === "publish").length || 0}
            </span>
          </div>
          <div className="four_card" data-aos="fade-right">
            <h2>Total Topics</h2>
            <span>4</span>
          </div>
          <div className="four_card" data-aos="fade-left">
            <h2>Total Tags</h2>
            <span>6</span>
          </div>
          <div className="four_card" data-aos="fade-left">
            <h2>Draft Blogs</h2>
            <span>
              {blogsData?.filter((ab) => ab.status === "draft").length || 0}
            </span>
          </div>
        </div>
        {/* year overview */}
        <div className="year_overview flex flex-sb">
          <div className="leftyearoverview" data-aos="fade-up">
            <div className="flex flex-sb">
              <h3>Year Overview</h3>
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-dot"></li>
                <li className="semi-medium-dot"></li>
                <li className="semi-small-dot"></li>
                <div className="small-dot"></div>
              </ul>
              <h3 className="text-right">
                10 / 365 <br /> <span>Total Published</span>
              </h3>
            </div>
            <Bar data={data} options={options} />
          </div>

          <div className="right_salescont" data-aos="fade-up">
            <div>
              <h3>Blogs By Category</h3>
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-dot"></li>
                <li className="semi-medium-dot"></li>
                <li className="semi-small-dot"></li>
                <div className="small-dot"></div>
              </ul>
            </div>
            <div className="blogscategory flex flex-center">
              <table>
                <thead>
                  <tr>
                    <td>Topics</td>
                    <td>Data</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Html, css & JavaScript</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>Next Js, React Js</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>Database</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>Deployment</td>
                    <td>10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>{" "}
      </div>
    </ProtectedRoute>
  );
}
