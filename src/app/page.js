

import ClientAboutView from "@/components/client-view/about";
import ClientContactView from "@/components/client-view/contact";
import ClientExperienceAndEducationView from "@/components/client-view/experience";
import ClientHomeView from "@/components/client-view/home";
import ClientProjectView from "@/components/client-view/project";

async function extractAllData(currentSection) {
  const res = await fetch(`https://portfolio-6ci3yz3vl-vipul-garg-1243s-projects.vercel.app/api/${currentSection}/get`, {
    method: "GET",
    cache: "no-store",
  });
  const data = await res.json();
  return data && data.data;
}


export default async function Home() {
  const homeSectionData = await extractAllData("home");
  const aboutSectionData = await extractAllData("about");
  const experienceSectionData = await extractAllData("experience");
  const educationSectionData = await extractAllData("education");
  const projectSectionData = await extractAllData("project");
  return (
    <div>
      <ClientHomeView data={homeSectionData} />
      <ClientAboutView data={aboutSectionData} />
      <ClientExperienceAndEducationView
        educationData={educationSectionData}
        experienceData={experienceSectionData}
      />
      <ClientProjectView data={projectSectionData} />
      <ClientContactView />
    </div>
  );
}
