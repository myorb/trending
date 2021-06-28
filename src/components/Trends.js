import React, { useState, useEffect } from "react";
import { Octokit } from "@octokit/core";

const Trends = function () {
  const octokit = new Octokit();
  const [sort] = useState('stars');
  const [order, setOrder] = useState('desc');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    octokit.request("GET /search/repositories", {
      q: 'q',
      sort: sort,
      order: order,
    }).then((resp) => {
      console.log(resp.data.items)
      setData(resp.data.items)
      setIsLoading(false);
    }).catch(error => console.log(error));
  })

  return (
    <div>
      {isLoading && <p>Wait I'm Loading....</p>}
      <select onChange={(e) => { setOrder(e.target.value)}}>
        <option value="desc">desc</option>
        <option value="asc">asc</option>
      </select>
      <select onChange={(e) => { setOrder(e.target.value)}}>
        <option value="stars">stars</option>
        <option value="forks">forks</option>
        <option value="help-wanted-issues">help-wanted-issues</option>

      </select>

      {data.map((row, index) => (
        <div key={index}>
          {row.archive_url && (
            <>
              <div>
                <h2 style={{ textDecoration: "Underline" }}>
                  <a href={row.forks_url}>
                    {row.full_name}
                  </a>
                </h2>
                <p>{row.description}</p>
              </div>
              <hr />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Trends