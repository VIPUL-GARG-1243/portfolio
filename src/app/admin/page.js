"use client";

import AdminAboutView from "@/components/admin-view/about";
import AdminContactView from "@/components/admin-view/contact";
import AdminEducationView from "@/components/admin-view/education";
import AdminExperienceView from "@/components/admin-view/experience";
import AdminHomeView from "@/components/admin-view/home";
import Login from "@/components/admin-view/login";
import AdminProjectView from "@/components/admin-view/project";
import { addData, getData, login, updateData } from "@/services";
import { useEffect, useState } from "react";

const initialHomeFormData = {
  heading: "",
  summary: "",
};

const initialAboutFormData = {
  aboutme: "",
  noofprojects: "",
  yearofexperience: "",
  noofclients: "",
  skills: "",
};

const initialEducationFormData = {
  degree: "",
  year: "",
  college: "",
};

const initialExperienceFormData = {
  position: "",
  company: "",
  duration: "",
  location: "",
  jobprofile: "",
};

const initialProjectFormData = {
  name: "",
  technologies: "",
  website: "",
  github: "",
};

const initialLoginFormData = {
  username: "",
  password: "",
};

export default function adminView() {
  const [currentSelectedTab, setCurrentSelectedTab] = useState("home");
  const [homeViewFormData, setHomeViewFormData] = useState(initialHomeFormData);
  const [aboutViewFormData, setAboutViewFormData] =
    useState(initialAboutFormData);
  const [educationViewFormData, setEducationViewFormData] = useState(
    initialEducationFormData
  );
  const [experienceViewFormData, setExperienceViewFormData] = useState(
    initialExperienceFormData
  );
  const [projectViewFormData, setProjectViewFormData] = useState(
    initialProjectFormData
  );
  const [loginFormData, setLoginFormData] = useState(initialLoginFormData);
  const [allData, setAllData] = useState({});
  const [update, setUpdate] = useState(false);
  const [authUser, setAuthUser] = useState(false);
  const menuItems = [
    {
      id: "home",
      label: "Home",
      component: (
        <AdminHomeView
          handleSaveData={handleSaveData}
          formData={homeViewFormData}
          setFormData={setHomeViewFormData}
        />
      ),
    },
    {
      id: "about",
      label: "About",
      component: (
        <AdminAboutView
          handleSaveData={handleSaveData}
          formData={aboutViewFormData}
          setFormData={setAboutViewFormData}
        />
      ),
    },
    {
      id: "experience",
      label: "Experience",
      component: (
        <AdminExperienceView
          handleSaveData={handleSaveData}
          formData={experienceViewFormData}
          setFormData={setExperienceViewFormData}
          data={allData?.experience}
        />
      ),
    },
    {
      id: "education",
      label: "Education",
      component: (
        <AdminEducationView
          handleSaveData={handleSaveData}
          formData={educationViewFormData}
          setFormData={setEducationViewFormData}
          data={allData?.education}
        />
      ),
    },
    {
      id: "project",
      label: "Project",
      component: (
        <AdminProjectView
          handleSaveData={handleSaveData}
          formData={projectViewFormData}
          setFormData={setProjectViewFormData}
          data={allData?.project}
        />
      ),
    },
    {
      id: "contact",
      label: "Contact",
      component: <AdminContactView data={allData && allData?.contact} />,
    },
  ];

  async function extractAllData() {
    const data = await getData(currentSelectedTab);
    if (currentSelectedTab == "home" && data && data.data && data.data.length) {
      setHomeViewFormData(data && data.data[0]);
      setUpdate(true);
    }
    if (
      currentSelectedTab == "about" &&
      data &&
      data.data &&
      data.data.length
    ) {
      setAboutViewFormData(data && data.data[0]);
      setUpdate(true);
    }
    if (data?.success) {
      setAllData({
        ...allData,
        [currentSelectedTab]: data && data.data,
      });
    }
  }

  async function handleSaveData(currentTab) {
    const dataMap = {
      home: homeViewFormData,
      about: aboutViewFormData,
      education: educationViewFormData,
      experience: experienceViewFormData,
      project: projectViewFormData,
    };
    const response = update
      ? await updateData(currentTab, dataMap[currentTab])
      : await addData(currentTab, dataMap[currentTab]);
    if (response.success) {
      resetFromData();
      extractAllData();
    }
  }

  useEffect(() => {
    extractAllData();
  }, [currentSelectedTab]);

  function resetFromData() {
    setHomeViewFormData(initialHomeFormData);
    setAboutViewFormData(initialAboutFormData);
    setEducationViewFormData(initialEducationFormData);
    setExperienceViewFormData(initialExperienceFormData);
    setProjectViewFormData(initialProjectFormData);
  }

  useEffect(() => {
    setAuthUser(JSON.parse(sessionStorage.getItem("authUser")));
  }, []);

  async function handleLogin() {
    const res = await login(loginFormData);
    console.log(res);
    if (res?.success) {
      setAuthUser(true);
      sessionStorage.setItem("authUser", JSON.stringify(true));
    }
  }

  if (!authUser) {
    return (
      <Login
        handleLogin={handleLogin}
        formData={loginFormData}
        setFormData={setLoginFormData}
      />
    );
  }

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-0.5 flex justify-center space-x-6" role="tablist">
        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className="p-4 font-bold text-xl text-black"
            onClick={() => {
              setCurrentSelectedTab(item.id);
              resetFromData();
              setUpdate(false);
            }}
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={() => {
            setAuthUser(false);
            sessionStorage.removeItem("authUser");
          }}
          className="p-4 font-bold text-xl text-black"
        >
          Logout
        </button>
      </nav>
      <div className="mt-10 p-10">
        {menuItems.map(
          (item) => item.id === currentSelectedTab && item.component
        )}
      </div>
    </div>
  );
}
