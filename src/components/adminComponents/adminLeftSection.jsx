import { MapPinIcon, UserGroupIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { useContext } from 'react';
import { CurrentSectionContext } from "../../context/currentSectionContext";

function AdminLeftSection() {
  const { currentSection, setCurrentSection } = useContext(CurrentSectionContext);

  return (
    <div
      id="leftSectionHeader"
      className="w-[16%] flex flex-col text-center gap-4 p-8 fixed"
    >
      <div onClick={() => setCurrentSection('points')} className={`flex items-center gap-2 px-10 py-[.5rem] rounded-[8px] [transition:background-color_.3s] cursor-pointer ${currentSection === "points" ? "!bg-[#0A2F51] !text-[#fff] hover:!bg-[#094883]" : "hover:bg-[#f5f5f5]"}`}>
        <MapPinIcon className="size-6 " />
        <span>Pontos</span>
      </div>

      <div onClick={() => setCurrentSection('users')} className={`flex items-center gap-2 px-10 py-[.5rem] rounded-[8px] [transition:background-color_.3s] cursor-pointer  ${currentSection === "users" ? "!bg-[#0A2F51] !text-[#fff] hover:!bg-[#094883]" : "hover:bg-[#f5f5f5]"}`}>
        <UserGroupIcon className="size-6 " />
        <span>Usuário</span>
      </div>

      <div onClick={() => setCurrentSection('events')} className={`flex items-center gap-2 px-10 py-[.5rem] rounded-[8px] [transition:background-color_.3s] cursor-pointer  ${currentSection === "events" ? "!bg-[#0A2F51] !text-[#fff] hover:!bg-[#094883]" : "hover:bg-[#f5f5f5]"}`}>
        <SpeakerWaveIcon className="size-6 " />
        <span>Eventos</span>
      </div>
    </div>
  );
}

export default AdminLeftSection;
