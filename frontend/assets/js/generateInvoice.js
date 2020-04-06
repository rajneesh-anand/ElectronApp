document.getElementById("download").addEventListener("click", () => {
	generate();
});
function loadFile(url, callback) {
	PizZipUtils.getBinaryContent(url, callback);
}
function generate() {
	loadFile(
		path.join(`file://${__dirname}`, "..", "/assets/tag-example.docx"),
		function (error, content) {
			if (error) {
				throw error;
			}

			// The error object contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
			function replaceErrors(key, value) {
				if (value instanceof Error) {
					return Object.getOwnPropertyNames(value).reduce(function (
						error,
						key
					) {
						error[key] = value[key];
						return error;
					},
					{});
				}
				return value;
			}

			function errorHandler(error) {
				console.log(JSON.stringify({ error: error }, replaceErrors));

				if (error.properties && error.properties.errors instanceof Array) {
					const errorMessages = error.properties.errors
						.map(function (error) {
							return error.properties.explanation;
						})
						.join("\n");
					console.log("errorMessages", errorMessages);
					// errorMessages is a humanly readable message looking like this :
					// 'The tag beginning with "foobar" is unopened'
				}
				throw error;
			}

			var zip = new PizZip(content);
			var doc;
			try {
				doc = new window.docxtemplater(zip);
			} catch (error) {
				// Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
				errorHandler(error);
			}

			doc.setData({
				first_name: "John",
				last_name: "Doe",
				phone: "0652455478",
				description: "New Website",
			});
			try {
				// render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
				doc.render();
			} catch (error) {
				// Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
				errorHandler(error);
			}

			var out = doc.getZip().generate({
				type: "blob",
				mimeType:
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			}); //Output the document using Data-URI
			saveAs(out, "Invoice.docx");
		}
	);
}
