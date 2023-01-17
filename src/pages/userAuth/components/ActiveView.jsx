import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

const ActiveView = (props) => {
  const { activeMealPacks, setActiveMealPacks } = props;

  const navigate = useNavigate();
	const rerouteToMealpack = () => {
		navigate("/mealpack")
	}

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("This is the title", 10, 10);
    // doc.save("meal-pack-instructions.pdf");
    doc.autoPrint({variant: 'non-conform'});
    doc.save('print-mealpacks.pdf');
  }

  const downloadAllPDF = () => {
    console.log("not yet dummy")
  }

  return (
    <div className="active-container">
      <h2>This is the active view component</h2>
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