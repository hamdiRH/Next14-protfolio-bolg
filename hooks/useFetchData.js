const { default: axios } = require("axios");
const { useState, useEffect } = require("react");

function useFetchData(apiEndPoint) {
  const [alldata, setAlldata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad) {
      // set initialload to false to prevent the api call on subsequent renders
      setInitialLoad(false);
      setLoading(false); // set loading to false to show components initally
      return; // exit useeffect
    }
    setLoading(true);
    const fetchAllData = async () => {
      try {
        const res = await axios.get(apiEndPoint);
        const alldata = res.data;
        setAlldata(alldata);
        setLoading(false); //set loading state to false after dat is fetched
      } catch {}
    };

    // fetch blog data only if apiEndPoint exists
    if (apiEndPoint) {
      fetchAllData();
    }
  }, [initialLoad, apiEndPoint]);

  return { alldata, loading };
}
export default useFetchData;
