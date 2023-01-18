import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { useEffect, useState } from "react";
import axios from "axios";

const ActiveView = (props) => {
  const { activeMealPacks, setActiveMealPacks, setPastMealPacks } = props;

  useEffect(() => {
    async function fetchData() {
      // let data = await axios.get(`store/:store_id/mealpack/all/status/true`);
      // setActiveMealPacks(data)
    }
    fetchData();
  }, [activeMealPacks])

  const navigate = useNavigate();
	const rerouteToMealpack = () => {
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

  const deactivateMealPack = async () => {
    // axios.put(`/store/:store_id/mealpack/:mealpack_id`, {
    //   is_publishing: false,
    // })
    // let data = await axios.get(`store/:store_id/mealpack/all/status/false`);
    // setPastMealPacks(data)
  }

  return (
    <div className="active-container">
      <h2>This is the active view component</h2>

      {activeMealPacks && activeMealPacks.map((e) => {
        return (
          <div>
            <p onClick={rerouteToMealpack}>{e.name}</p>
            <button onClick={downloadPDF} style={{ marginBottom: "10px" }}>Download PDF</button>
            <button onClick={deactivateMealPack}>Deactivate Meal Pack</button>
          </div>
        );
      })}

      <div style={{ display: "flex" }}>
        <p style={{ marginBottom: "0px" }} onClick={rerouteToMealpack}>spaghetti</p>
        <button onClick={downloadPDF} style={{ marginBottom: "10px" }}>Download PDF</button>
      </div>
      <div style={{ display: "flex" }}>
        <p style={{ marginBottom: "0px" }} onClick={rerouteToMealpack}>chicken and broccoli</p>
        <button onClick={downloadPDF} style={{ marginBottom: "10px" }}>Download PDF</button>
      </div>
      <div style={{ display: "flex" }}>
        <p style={{ marginBottom: "0px" }} onClick={rerouteToMealpack}>ham sandwich</p>
        <button onClick={downloadPDF} style={{ marginBottom: "10px" }}>Download PDF</button>
      </div>
      <button onClick={downloadAllPDF}>Download ALL PDFs</button>

    </div>
  )
}

export default ActiveView;