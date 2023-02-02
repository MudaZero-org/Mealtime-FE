import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/pages/_homepage.scss";
import { v4 as uuidv4 } from "uuid";
import API_URL, {REACT_APP_URL} from "../../../Constants";
import MealPackDetailsModal from "./MealPackDetailsModal"
import star from "../../../images/star.png";


const ActiveView = (props) => {
	const [show, setShow] = useState(false);
	const [selectedMealPack, setSelectedMealPack] = useState(null);
	const [selectionArr, setSelectionArr] = useState([]);

	const {
		activeMealPacks,
		setActiveMealPacks,
		setPastMealPacks,
		pastMealPacks,
		selectedActivePack,
		setSelectedActivePastPack,
	} = props;

	useEffect(() => {
		async function fetchData() {
			const user = JSON.parse(localStorage.getItem("user"));
			const storeId = user.data.storeId;
			let data = await axios.get(
				`${API_URL}/store/${storeId}/mealpack/all/favorite`,
				{
					headers: { authorization: `Bearer ${user.accessToken}` },
				}
			);
			data.data.map((meal) => meal.selectedFav = false)
			setActiveMealPacks(data.data);
		}
		fetchData();
	}, []); // pastMealPacks (causing infinite calls)

	// fetchActivePacks copies above useEffect, without causing infinite loop
	const fetchActivePacks = async () => {
		const user = JSON.parse(localStorage.getItem("user"));
		const storeId = user.data.storeId;
		let data = await axios.get(
			`${API_URL}/store/${storeId}/mealpack/all/favorite`,
			{
				headers: { authorization: `Bearer ${user.accessToken}` },
			}
		);
		setActiveMealPacks(data.data);
	};

	const navigate = useNavigate();
	const rerouteToMealpack = (meal) => {
		setSelectedActivePastPack(meal);
		navigate("/mealpack");
	};

	const downloadPDF = (meal) => {
		let qrCode = generateQRCode(meal);
		const doc = new jsPDF("p", "mm", "a4");
		let width = doc.internal.pageSize.getWidth();
		const name = meal.mealpackName;
		const instructions = meal.recipeDetail.analyzedInstructions[0].steps.map((e) => " " + e.number + "." + " " + e.step)
		const ingredients = meal.recipeDetail.extendedIngredients.map((e) => " " + e.name)
		doc.setFontSize(24);
		doc.text(10, 90, `${name}`);
		doc.setFontSize(18);
		doc.text(10, 110, [`Ingredients: ${ingredients}`], {
			maxWidth: width / 1.15,
		})
		doc.text(10, 140, [`${instructions}`], {
			maxWidth: width / 1.15,
		});
		doc.addImage(qrCode, "PNG", 10, 15, 50, 50);
		doc.addImage(meal.recipeDetail.image, "JPG", 100, 15, 80, 50)
		doc.autoPrint({ variant: "non-conform" });
		doc.save("print-mealpacks.pdf");
	};

	const downloadAllPDF = () => {
		const doc = new jsPDF("p", "mm", "a4");
		let width = doc.internal.pageSize.getWidth();
		selectionArr.map((meal) => {
			let qrCode = generateQRCode(meal);
			let name = meal.mealpackName;
			let instructions = meal.recipeDetail.analyzedInstructions[0].steps.map((e) => " " + e.number + "." + " " + e.step)
			let ingredients = meal.recipeDetail.extendedIngredients.map((e) => " " + e.name)
			doc.setFontSize(24);
			doc.text(10, 90, `${name}`);
			doc.setFontSize(18);
			doc.text(10, 110, [`Ingredients: ${ingredients}`], {
				maxWidth: width / 1.15,
			})
			doc.text(10, 140, [`${instructions}`], {
				maxWidth: width / 1.15,
			});
			doc.addImage(qrCode, "PNG", 10, 15, 50, 50);
			doc.addImage(meal.recipeDetail.image, "JPG", 100, 15, 80, 50)
			doc.addPage();
		})
		let pageCount = doc.internal.getNumberOfPages();
		doc.deletePage(pageCount);
		doc.save("print-mealpacks.pdf")
	};

	const generateQRCode = (meal) => {
		const QRCode = require("qrcode");
		let qrCodeDataUrl;
		let recipeId = meal.recipeId
		QRCode.toDataURL(`${REACT_APP_URL}/info/${recipeId}`, function (err, url) {
			qrCodeDataUrl = url;
		});
		return qrCodeDataUrl;
	};

	const deactivateMealPack = async (meal) => {
		const user = JSON.parse(localStorage.getItem("user"));
		const storeId = user.data.storeId;
		await axios.put(
			`${API_URL}/store/${storeId}/mealpack/${meal.id}`,
			{
				isFavorite: false,
				mealpackName: meal.mealpackName,
				isDelete: false,
			},
			{
				headers: { authorization: `Bearer ${user.accessToken}` },
			}
		);
		let data = await axios.get(
			`${API_URL}/store/${storeId}/mealpack/all`,
			{
				headers: { authorization: `Bearer ${user.accessToken}` },
			}
		);
		setPastMealPacks(data.data);
	};

	const addToSelectedArr = (meal) => {
		if (meal.selectedFav) {
			const arr = [...selectionArr]
			arr.splice(arr.indexOf(meal), 1);
			setSelectionArr(arr);
			meal.selectedFav = false;
		} else {
			const arr = [...selectionArr];
			arr.push(meal)
			setSelectionArr(arr)
			meal.selectedFav = true;
		}
	}

	const renderInput = (meal) => {
		if (meal.selectedFav) {
			return (
				<input checked className="checkbox" type="checkbox" onChange={() => addToSelectedArr(meal)}></input>
			)
		} else {
			return (
				<input className="checkbox" type="checkbox" onChange={() => addToSelectedArr(meal)}></input>
			)
		}
	}
	

  return (
    <div className="active-container">
      <h2 className="active-title">Favorite Meal Packs</h2>

      <div className="tile is-parent active-mealpacks">
        {activeMealPacks && activeMealPacks.map((e) => {
          return (
            <div key={uuidv4()} className="tile is-child is-4">
              <div key={uuidv4()} className="active-mealpack-container">
                <img className="food-small-image" src={e.recipeDetail["image"]}></img>
								{renderInput(e)}

                <p key={uuidv4()} className="mealpack-title"><strong>{e.mealpackName}</strong></p>
                <div className="tags active-mealpacks-tags">
                  {e.recipeDetail.vegetarian && <span className="tag" id="vegetarian">vegetarian</span>}
                  {e.recipeDetail.vegan && <span className="tag" id="vegan">vegan</span>}
                  {e.recipeDetail.glutenFree && <span className="tag" id="gluten">gluten free</span>}
                  {e.recipeDetail.dairyFree && <span className="tag" id="dairy">dairy free</span>}
                </div>
                <div className="active-mealpacks-buttons">
                  <button key={uuidv4()} className="button" onClick={() => downloadPDF(e)} style={{ marginBottom: "10px" }}>Download PDF</button>
                  <button key={uuidv4()} className="button" onClick={() => {
										//Old code
										// rerouteToMealpack(e)
										setShow(true)
										setSelectedMealPack(e)
										}}>See Meal Pack Info</button>
                  <button key={uuidv4()} className="button" onClick={async () => {
                    await deactivateMealPack(e)
                    fetchActivePacks()
                  }}>Remove from Favorites</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
			<footer className="footer"></footer>
			{selectionArr.length > 0 && (
				<div className="selection-footer">
					<div className="selection-popup-container">
						<h1 style={{ color: "black" }}>You have selected {selectionArr.length} meal packs to print</h1>
						<div className="selection-popup-buttons">
							<button key={uuidv4()} className="button is-medium print-all-button" onClick={downloadAllPDF}>Download Selected PDF's</button>
							<button 
								onClick={() => {
									setSelectionArr([])
									activeMealPacks.map((meal) => meal.selectedFav = false)
								}} className="button is-medium clear-selection-button">Clear All Selected</button>
						</div>
					</div>
				</div>
			)}
			<MealPackDetailsModal
				selectedMealPack={selectedMealPack}
					setSelectedMealPack={setSelectedMealPack}
					show={show}
					setShow={setShow}
			/>
    </div>
  )
}

export default ActiveView;
