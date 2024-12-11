var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var sitesArray = [];

var regex = {
	siteName: {
		value: /^[A-Z][a-z0-9\sA-Z]{3,10}$/,
		isValid: false,
	},
	siteUrl: {
		value:
			/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/i,
		isValid: false,
	},
};

if (localStorage.getItem("sitesContainer") !== null) {
	sitesArray = JSON.parse(localStorage.getItem("sitesContainer"));
	displayData();
}
function addSite() {
	var site = {
		name: siteNameInput.value.trim(),
		url: siteUrlInput.value,
	};
	sitesArray.push(site);
	displayData();
	resetInputs();

	localStorage.setItem("sitesContainer", JSON.stringify(sitesArray));
}
function resetInputs() {
	siteNameInput.value = null;
	siteUrlInput.value = null;
}

function displayData() {
	var siteContainer = ``;
	for (let i = 0; i < sitesArray.length; i++) {
		siteContainer += createRow(i);
	}
	document.getElementById("rowDataContianer").innerHTML = siteContainer;
}
function createRow(i) {
	return `					<tr>
						<th scope="row">${i + 1}</th>
						<td>${sitesArray[i].name}</td>
						<td>
							<a href="http://${sitesArray[i].url}" target="_blank">
								<button class="btn btn-success">
									<i class="fa-solid fa-eye pe-2"></i>Visit
								</button></a
							>
						</td>
						<td>
							<button class="btn btn-danger pe-2" onclick="deleteSite(${i})">
								<i class="fa-solid fa-trash-can"></i>
								Delete
							</button>
						</td>
					</tr>`;
}

function deleteSite(deleteIndex) {
	sitesArray.splice(deleteIndex, 1);

	displayData();
	localStorage.setItem("sitesContainer", JSON.stringify(sitesArray));
}
function validateInputs(element) {
	if (regex[element.id].value.test(element.value) == true) {
		regex[element.id].isValid = true;
		element.classList.add("is-valid");
		element.classList.remove("is-invalid");
	} else {
		regex[element.id].isValid = false;
		element.classList.remove("is-valid");
		element.classList.add("is-invalid");
	}
	toggleSubmitBtn();
}
function toggleSubmitBtn() {
	if (regex.siteName.isValid && regex.siteUrl.isValid) {
		submitBtn.disabled = false;
	} else {
		submitBtn.disabled = true;
	}
}
