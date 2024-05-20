"use client";

// import styles from "./page.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  type DataDummy = {
    userId: number;
    id: number;
    title: string;
    body: string;
  };

  const [data, setData] = useState<DataDummy[] | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Function to fetch data from API
    const fetchData = async () => {
      try {
        // Make API call using Axios
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );

        // console.log(response);

        // Set data state with API response
        setData(response.data);
      } catch (error) {
        // Handle error if API call fails
        console.log(error);
        // setError(error);
      } finally {
        // Set loading state to false once API call is completed
        setLoading(false);
      }
    };

    // Call fetchData function when component mounts
    fetchData();

    // Clean-up function to cancel any pending API requests
    return () => {};
  }, []);

  console.log(data);

  return (
    <>
      <main>
        {data?.map((el, index) => (
          <>
            <p key={index}>{el.userId}</p>
            <p key={index}>{el.id}</p>
            <p key={index}>{el.title}</p>
            <p key={index}>{el.body}</p>
          </>
        ))}
      </main>
    </>
  );
}
