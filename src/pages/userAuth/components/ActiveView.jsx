import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { useEffect, useState } from "react";
import axios from "axios";

const ActiveView = (props) => {
  const { activeMealPacks, setActiveMealPacks, setPastMealPacks, selectedActivePack, setSelectedActivePack } = props;

  useEffect(() => {
    async function fetchData() {
      const user = JSON.parse(localStorage.getItem("user"))
		  const storeId = user.data.userId
      let data = await axios.get(`store/${storeId}/mealpack/all/status/true`);
      setActiveMealPacks(data.data)
    }
    fetchData();
  }, [])

  const navigate = useNavigate();
	const rerouteToMealpack = (meal) => {
    setSelectedActivePack(meal)
    console.log(meal)
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
      <h2>Active Meal Packs</h2>

      {activeMealPacks && activeMealPacks.map((e, index) => {
        return (
          <div>
            <p key={index} onClick={() => rerouteToMealpack(e)}>{e.mealpackName}</p>
            <button onClick={downloadPDF} style={{ marginBottom: "10px" }}>Download PDF</button>
            <button onClick={() => deactivateMealPack(e)}>Deactivate Meal Pack</button>
          </div>
        );
      })}
    </div>
  )
}

export default ActiveView;