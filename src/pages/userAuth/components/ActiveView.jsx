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
      let data = await axios.get(`store/${storeId}/mealpack/all/status/true`);
      setActiveMealPacks(data.data)
    }
    fetchData();
  }, []) // pastMealPacks (causing infinite calls)

  // fetchActivePacks copies above useEffect, without causing infinite loop
  const fetchActivePacks = async () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const storeId = user.data.userId
    let data = await axios.get(`store/${storeId}/mealpack/all/status/true`);
    console.log("hello")
    setActiveMealPacks(data.data)
  }

  const navigate = useNavigate();
	const rerouteToMealpack = (meal) => {
    setSelectedActivePastPack(meal)
		navigate("/mealpack")
	}

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("This is the title", 10, 10);
    doc.autoPrint({variant: 'non-conform'});
    doc.save('print-mealpacks.pdf');
  }

  const downloadAllPDF = () => {
    console.log("not yet dummy")
  }

  const deactivateMealPack = async (meal) => {
    const user = JSON.parse(localStorage.getItem("user"))
		const storeId = user.data.userId
    console.log(meal.id)
    await axios.put(`/store/${storeId}/mealpack/${meal.id}`, {
      is_publishing: false,
    })
    let data = await axios.get(`store/${storeId}/mealpack/all/status/false`);
    setPastMealPacks(data.data)
  }

  return (
    <div className="active-container">
      <h2 className="active-title">Active Meal Packs</h2>

      {activeMealPacks && activeMealPacks.map((e, index) => {
        return (
          <div className="active-mealpack-container">
            <p className="mealpack-title" key={index}><strong>{e.mealpackName}</strong> meal pack</p>
            <button className="button" onClick={downloadPDF} style={{ marginBottom: "10px" }}>Download PDF</button>
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