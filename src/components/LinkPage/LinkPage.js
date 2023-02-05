import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DisplayLinks from './DisplayLinks';
import NoLinks from './NoLinks';


const LinkPage = ({ details, setDetails }) => {

  const [linkData, setLinkData] = useState([]);
  const navigate = useNavigate();

  // window.onload = function () {
  //   if (!window.location.hash) {
  //     // window.alert('ONLOAD')
  //     window.location = window.location + '#loaded';
  //     window.location.reload();
  //   }
  // }

  const getLinks = useCallback(async () => {

    try {
      const resGetLinks = process.env.REACT_APP_API_URL + `/link-page/${details.id}`;
      const res = await fetch(resGetLinks, {
        method: "GET",
        headers: {
          'Accept': "application/json",
          // 'Content-Type': 'application/json'  
        }
      })
      const data = await res.json();
      setLinkData(data.data);

    } catch (err) {
      // console.log(err);
    }
  }, [details.id])

  const deleteLink = async (linkId) => {

    try {
      const resDeleteLink = process.env.REACT_APP_API_URL + '/link-page/delete-link';
      const res = await fetch(resDeleteLink, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          linkId, userId: details.id
        })
      });

      const res_data = await res.json();
      if (res_data.error === false) {
        // window.alert('DELETE');
        window.location = window.location + '#loaded';
        navigate(0)
      } else {

      }
      // console.log(res_data);

    } catch (error) {

    }
  }

  useEffect(() => {

    const session = JSON.parse(sessionStorage.getItem('details'));

    if (details.isLoggedIn === false && session === null) {
      navigate("/please-log-in");
      return 0;
    }

    if (!details.id) {
      const newDetails = {
        email: session.email,
        id: session.id,
        isLoggedIn: true
      }
      setDetails(newDetails);
    }

    getLinks();
  }, [details.id, details.isLoggedIn, setDetails, getLinks, navigate])

  return (
    <>
      {
        (linkData && linkData.length !== 0) ?
          (<DisplayLinks linkData={linkData} deleteLink={deleteLink} />) : (
            <NoLinks />
          )
      }
    </>
  )
}

export default LinkPage