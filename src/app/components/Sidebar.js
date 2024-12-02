import { pengertian, saranIntervensi, faktorRisiko } from "./constants";
export default function SideBar({ filters, selectedProvince }) {

  return (
    <div className="w-1/4 h-screen overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-300 p-6 bg-gradient-to-b from-[#535353] to-[#303030] flex flex-col items-center gap-y-5">
        <div id="header" className="relative mb-4">
          <h1 className="text-white text-3xl font-semibold">Cardio-Map.</h1>
        </div>

        <div className="w-full flex flex-col justify-center" id="pengertian">
            <h1 className="text-white text-xl">Pengertian {filters}</h1>
            <p className="text-sm text-justify min-h-52">{pengertian[filters] ? pengertian[filters]:"-"}</p>
        </div>
        <div className="w-full flex flex-col justify-center" id="faktorRisiko">
            <h1 className="text-white text-xl">Faktor Risiko {filters} {selectedProvince ? "di "+selectedProvince: ""}</h1>
            <p className="text-sm text-justify min-h-52">
                {
                    faktorRisiko[selectedProvince] && faktorRisiko[selectedProvince][filters]
                    ? faktorRisiko[selectedProvince][filters]
                    : "-"
                }
            </p>
        </div>

    </div>
  );
}
