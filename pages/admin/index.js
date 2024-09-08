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
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "@/redux/actions/blogActions";
import { fetchTags } from "@/redux/slices/tagsSlice";
import ReactIcon from "@/components/ReactIcon";

export default function Home() {
  const dispatch = useDispatch();
  const { blogs, publicBlogsCount, draftBlogsCount } = useSelector(
    (state) => state.blogs
  );
  console.log("🚀 ~ Home ~ blogs:", blogs);
  const { tags, loadingTags, errorTags, tagsCount } = useSelector(
    (state) => state.tags
  );

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
    dispatch(fetchBlogs());
    dispatch(fetchTags());
  }, [dispatch]);

  // Aggregate data by year and month
  const monthlydata = blogs
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
  console.log("🚀 ~ Home ~ data:", data);

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
            <h2>Published Blogs</h2>
            <span>{publicBlogsCount || 0}</span>
          </div>
          <div className="four_card" data-aos="fade-left">
            <h2>Draft Blogs</h2>
            <span>{draftBlogsCount || 0}</span>
          </div>
          <div className="four_card" data-aos="fade-right">
            <h2>Total tags</h2>
            <span>{tagsCount || 0}</span>
          </div>
          <div className="four_card" data-aos="fade-left">
            <h2>--- ---</h2>
            <span>__</span>
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
                {publicBlogsCount} / {blogs.length} <br />{" "}
                <span>Total Published</span>
              </h3>
            </div>
            <Bar data={data} options={options} />
          </div>

          <div className="right_salescont " data-aos="fade-up">
            <div>
              <h3 className="mb-5">Blogs By Category</h3>
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-dot"></li>
                <li className="semi-medium-dot"></li>
                <li className="semi-small-dot"></li>
                <div className="small-dot"></div>
              </ul>
            </div>
            <div className="blogscategory overflow-y-scroll h-90 ">
              <div className="grid grid-cols-4 w-full ">
                <div className="text-left pl-4 col-span-3 bg-lime-200">
                  Topics
                </div>
                <div className="text-center col-span-1 bg-indigo-200">Data</div>
              </div>
              <div className="">
                {tags.map((tag) => (
                  <div key={tag._id} className="grid grid-cols-4 w-full ">
                    <div className="text-left pl-4 col-span-3 bg-lime-200 flex gap-1">
                      <ReactIcon icon={tag.iconName} size={30} color="black" />
                      {tag.name}
                    </div>
                    <div className="text-center col-span-1 bg-indigo-200">
                      {blogs.filter((el) =>
                        el.tags.some((elm) => elm.slug === tag.slug)
                      ).length || 0}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </ProtectedRoute>
  );
}
