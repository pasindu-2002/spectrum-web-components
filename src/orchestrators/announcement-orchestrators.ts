import annoucementConfig from "../orchestrators/announcement.config.json";
interface AnnoucementConfig {
  title: string;
  description: string;
  primaryBtnText: string;
  secondaryBtnText: string;
}

const config: AnnoucementConfig = annoucementConfig;
const annoucement = document.createElement("pl-announcement") as any;

annoucement.title = config.title;
annoucement.description = config.description;
annoucement.primaryBtnText = config.primaryBtnText;
annoucement.secondaryBtnText = config.secondaryBtnText;

annoucement.addEventListener("primary-btn-click", () => {
    alert("Primary Button Clicked");
});

annoucement.addEventListener("secondary-btn-click", () => {
    alert("Secondary Button Clicked");
});

document.querySelector("#annoucement")?.appendChild(annoucement);

setTimeout(async () => {
  await annoucement.open();
}, 0);
