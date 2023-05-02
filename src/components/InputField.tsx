import { useState, useRef } from "react";

const SERVER = "https://s2dlab.click:443/auth";

export default function InputField() {
  const [apiKey, setApiKey] = useState("");
  const [fileName, setFileName] = useState("No File uploaded");

  const emailRef = useRef<any>();
  const companyNameRef = useRef<any>();
  const companySizeRef = useRef<any>();
  const roleRef = useRef<any>();
  const usageRef = useRef<any>();
  const fileRef = useRef<any>();

  const ClickForm = async () => {
    if (
      emailRef.current.value &&
      companyNameRef.current.value &&
      companySizeRef.current.value &&
      roleRef.current.value &&
      usageRef.current.value
    ) {
      const userInfo = {
        email: emailRef.current.value,
        companyName: companyNameRef.current.value,
        companySize: companySizeRef.current.value,
        role: roleRef.current.value,
        usage: usageRef.current.value,
      };
      const response = await fetch(`${SERVER}/enroll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      }).catch((error) => {
        alert("Internal server error.");
        console.error(error);
        return;
      });

      if (!response) {
        alert("No server response.");
        console.error("No server response.");
        return;
      }

      const responseResult = await response.text();
      setApiKey(responseResult);
      alert("Copy your API Key to Figma input field!");
    } else {
      alert("Plase fill in the entire form.");
    }
  };

  const ClickFile = async () => {
    if (fileRef.current) {
      if (!apiKey) {
        alert("Please get API Key first.");
        return;
      }
      fileRef.current.value = "";

      await fetch(`${SERVER}/credit`, {
        method: "POST",
        headers: {
          apiKey: apiKey,
        },
      }).catch((error) => {
        console.error(error);
        return;
      });

      alert(
        "Stay tuned for our optimized AI model, We greatly appreciate your submission!"
      );
    } else {
      alert("Please upload the UI screenshot :)");
    }
  };

  const ClickCopy = async () => {
    if (!apiKey) {
      alert("Please get API Key first.");
      return;
    } else {
      try {
        await navigator.clipboard.writeText(apiKey);
        alert("Your API Key has been successfully copied to the clipboard.");
      } catch (e) {
        alert("Unable to copy automatically. Please copy manually.");
      }
    }
  };

  const FileChange = () => {
    setFileName(fileRef.current.value)
  }

  return (
    <>
      <header
        style={{
          color: "#c4fa70",
          maxWidth: "100%",
          maxHeight: "100%",
          fontFamily: "Kumbh Sans",
          fontWeight: 700,
          fontSize: 20,
          paddingLeft: 40,
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <h1 className="PageTitle">Join the waitlist today to be the First!</h1>
        <p
          className="PageTitlePhrase"
          style={{
            color: "#c4fa70",
            fontWeight: 200,
            fontSize: 22,
            display: "flex",
            flexDirection: "row",
          }}
        >
          Experience our revolutionary design automation tool
          <br />
          and stay up to date with our latest product news,
          <br />
          exclusive offers, and early access opportunities.
        </p>
      </header>

      <div
        style={{
          color: "#c4fa70",
          fontFamily: "Kumbh Sans",
        }}
      >
        <div
          className="WholeInputField"
          style={{
            display: "flex",
            paddingLeft: 40,
            paddingBottom: 30,
            flexDirection: "column",
            columnGap: "10px",
            height: 400,
            justifyContent: "space-between",
          }}
        >
          <div
            className="InputField1"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label
              style={{
                textAlign: "left",
                fontWeight: "Bold",
                fontSize: 20,
                color: "#f2f2f2",
              }}
            >
              Email
            </label>
            <input
              type="email"
              id="EmailField"
              ref={emailRef}
              style={{
                borderRadius: 8,
                maxWidth: "100%",
                maxHeight: "100%",
                width: 300,
                height: 30,
              }}
            />
          </div>
          <div
            className="InputField2"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label
              style={{
                textAlign: "left",
                fontWeight: "Bold",
                fontSize: 20,
                color: "#f2f2f2",
              }}
            >
              Company Name
            </label>
            <input
              type="text"
              id="CompanyNameField"
              ref={companyNameRef}
              style={{
                borderRadius: 8,
                maxWidth: "100%",
                maxHeight: "100%",
                width: 300,
                height: 30,
              }}
            />
          </div>
          <div
            className="InputField3"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label
              style={{
                textAlign: "left",
                fontWeight: "Bold",
                fontSize: 20,
                color: "#f2f2f2",
              }}
            >
              Company Size
            </label>
            <input
              type="text"
              id="CompanySizeField"
              ref={companySizeRef}
              style={{
                borderRadius: 8,
                maxWidth: "100%",
                maxHeight: "100%",
                width: 300,
                height: 30,
              }}
            />
          </div>
          <div
            className="InputField4"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label
              style={{
                textAlign: "left",
                fontWeight: "Bold",
                fontSize: 20,
                color: "#f2f2f2",
              }}
            >
              Role
            </label>
            <input
              type="text"
              id="RoleField"
              ref={roleRef}
              style={{
                borderRadius: 8,
                maxWidth: "100%",
                maxHeight: "100%",
                width: 300,
                height: 30,
              }}
            />
          </div>
          <div
            className="InputField5"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label
              style={{
                textAlign: "left",
                fontWeight: "Bold",
                fontSize: 20,
                color: "#f2f2f2",
              }}
            >
              Usage & Expectation
            </label>
            <input
              type="text"
              id="UsageField"
              ref={usageRef}
              style={{
                borderRadius: 8,
                maxWidth: "100%",
                maxHeight: "100%",
                width: 300,
                height: 80,
              }}
            />
          </div>
        </div>
        <div>
          <button
            onClick={ClickForm}
            style={{
              marginLeft: 40,
              marginBottom: 30,
              backgroundColor: "#c4fa70",
              borderRadius: 8,
              maxWidth: "100%",
              maxHeight: "100%",
              width: 310,
              height: 50,
              color: "#0c1ea7",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            SUMBIT
          </button>
          <div
            className="APIKeyField"
            style={{
              paddingLeft: 40,
              paddingBottom: 60,
            }}
          >
            <label
              style={{
                textAlign: "left",
                fontWeight: "Bold",
                fontSize: 20,
                color: "#c4fa70",
              }}
            >
              API Key
            </label>
            <div
              style={{
                display: "flex",
                justifyContent: "row",
              }}
            >
              <div
                className="rectangleAPIKey"
                style={{
                  backgroundColor: "#c4fa70",
                  borderRadius: 8,
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: 240,
                  height: 40,
                  color: "#0c1ea7",
                  whiteSpace: "nowrap",
                  overflow: "hideen",
                  textOverflow: "ellipsis",
                }}
              >
                {apiKey}
              </div>
              <button
                id="Copy Button"
                onClick={ClickCopy}
                style={{
                  backgroundColor: "#2483ff",
                  borderRadius: 8,
                  width: 60,
                  height: 40,
                  color: "#f2f2f2",
                  fontWeight: 700,
                  marginLeft: 10,
                }}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
        <div
          id="ResultFileSubmit"
          style={{
            paddingLeft: 48,
          }}
        >
          <h1>How to Earn Extra Credits</h1>
          <i style={{ fontWeight: "bold", fontSize: 20 }}>
            {" "}
            ※ Do not close this browser until submission.
          </i>
          <p
            style={{
              fontWeight: 200,
              fontSize: 20,
              marginBottom: 15,
            }}
          >
            1. Enter your information and get API Key
            <br />
            2. Simply upload your UI screenshot image files
            <br />
            3.Submit the image to earn extra credits
          </p>
          <div id="FileSubmission" style={{ fontSize: 15, fontWeight: 700 }}>
            <input value={fileName} placeholder="No File uploaded" readOnly
              style={{
                display: "inline-block",
                height: "40px",
                padding: "0 10px",
                verticalAlign: "middle",
                border: "1px solid #dddddd",
                width: 200,
                color: "#999999",
              }} 
            />
            <label htmlFor="file" 
              style={{
                display: "inline-block",
                padding: "10px 20px",
                color: "#ffffff",
                verticalAlign: "middle",
                cursor: "pointer",
                height: "20px",
                marginLeft: "10px",
                backgroundColor: "#2483ff",
                borderRadius: 8,
              }}
            >Upload</label> 
            <input 
              type="file"
              accept="image/*"
              id="file"
              ref={fileRef}
              onChange={FileChange}
              style={{
                position: "absolute",
                width: "0",
                height: "0",
                padding: "0",
                overflow: "hidden",
                border: "0",
              }}
            />
          </div>
          <button
            onClick={ClickFile}
            style={{
              color: "#0c1ea7",
              textAlign: "left",
              fontWeight: "Bold",
              fontSize: 30,
              marginTop: 20,
              marginBottom: 40,
              width: 322,
            }}
          >
            Upload the result file
          </button>
        </div>
      </div>
    </>
  );
}
