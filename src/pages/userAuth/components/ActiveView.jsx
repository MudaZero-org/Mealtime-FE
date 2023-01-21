import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/pages/_homepage.scss";

const ActiveView = (props) => {
  const { activeMealPacks, setActiveMealPacks, setPastMealPacks, pastMealPacks, selectedActivePack, setSelectedActivePastPack } = props;

  useEffect(() => {
    async function fetchData() {
      const user = JSON.parse(localStorage.getItem("user"))
		  const storeId = user.data.userId
      let data = await axios.get(`http://13.231.182.135:8080/store/${storeId}/mealpack/all/status/true`, {
        headers: {authorization: `Bearer ${user.accessToken}`}
      });
      setActiveMealPacks(data.data)
    }
    fetchData();
  }, []) // pastMealPacks (causing infinite calls)

  // fetchActivePacks copies above useEffect, without causing infinite loop
  const fetchActivePacks = async () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const storeId = user.data.userId
    let data = await axios.get(`http://13.231.182.135:8080/store/${storeId}/mealpack/all/status/true`,{
			headers: {authorization: `Bearer ${user.accessToken}`}
		});
    console.log("hello")
    setActiveMealPacks(data.data)
  }

  const navigate = useNavigate();
	const rerouteToMealpack = (meal) => {
    setSelectedActivePastPack(meal)
		navigate("/mealpack")
	}

  const downloadPDF = (meal) => {
    let qrCode = generateQRCode(meal);
    const doc = new jsPDF("p", "mm", "a4");
    let width = doc.internal.pageSize.getWidth();
    const name = meal.mealpackName;
    const details = meal.recipeDetail;
    doc.setFontSize(24)
    doc.text(10, 90, `${name}`)
    doc.setFontSize(18)
    doc.text(10, 110, [`${details.instructions}`], {
      maxWidth: width / 1.15
    });
    doc.addImage(qrCode, "PNG", 10, 15, 50, 50)
    doc.autoPrint({variant: 'non-conform'});
    doc.save('print-mealpacks.pdf');
  }

  const downloadAllPDF = () => {
    console.log("not yet dummy")
  }

  const generateQRCode = (meal) => {
    console.log(meal)
    const QRCode = require('qrcode')
    let qrCodeDataUrl;
    QRCode.toDataURL(meal.recipeDetail.sourceUrl, function (err, url) {
      qrCodeDataUrl = url;
    })
    return qrCodeDataUrl
  }

  const deactivateMealPack = async (meal) => {
    const user = JSON.parse(localStorage.getItem("user"))
		const storeId = user.data.userId
    console.log(meal.mealpackName)
    await axios.put(`http://13.231.182.135:8080/store/${storeId}/mealpack/${meal.id}`, {
      isPublishing: false,
      mealpackName: meal.mealpackName,
      isDelete: false
    },
    {
			headers: {authorization: `Bearer ${user.accessToken}`}
		})
    let data = await axios.get(`http://13.231.182.135:8080/store/${storeId}/mealpack/all/status/false`, {
			headers: {authorization: `Bearer ${user.accessToken}`}
		});
    setPastMealPacks(data.data)
  }

  return (
    <div className="active-container">
      <h2 className="active-title">Active Meal Packs</h2>

      {activeMealPacks && activeMealPacks.map((e, index) => {
        return (
          <div className="active-mealpack-container">
            <p className="mealpack-title" key={index}><strong>{e.mealpackName}</strong> meal pack</p>
            <button className="button" onClick={() => downloadPDF(e)} style={{ marginBottom: "10px" }}>Download PDF</button>
            <button className="button" onClick={() => rerouteToMealpack(e)}>See Meal Pack Info</button>
            <button className="button" onClick={async () => {
              await deactivateMealPack(e)
              fetchActivePacks()
            }}>Deactivate Meal Pack</button>
          </div>
        );
      })}
    </div>
  )
}

export default ActiveView;