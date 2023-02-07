import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../Constants";

const Info = () => {
  const [page, setPage] = useState(null);

  const {recipeId} = useParams();

  useEffect(() => {
    const getPage = async () => {
      let data = await axios.get(`${API_URL}/mealpack/${recipeId}/instruction`)
      let dataArr = data.data.split("body")
      let finalPage = `${"<body" + dataArr[1] + "body>"}`
      setPage(finalPage)
    }
    getPage();
  }, [])

  return (
    <>
      {page && <div className="info-page" dangerouslySetInnerHTML={{__html: page}} />}
    </>
  )
}

export default Info;