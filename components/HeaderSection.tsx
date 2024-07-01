import { useTranslations } from "next-intl";
import { useState } from "react";
import { observer } from "mobx-react-lite";

import { LocaleSwitcher } from "./LocaleSwitcher";

type HeaderSectionProps = {
  fullName: string;
  teamName: string;
  handleMyAccount: () => void;
  handleConfigurations: () => void;
  handleLogout: () => void;
};

const HeaderSection = observer<HeaderSectionProps>(
  ({
    fullName,
    teamName,
    handleMyAccount,
    handleConfigurations,
    handleLogout,
  }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const translations = useTranslations("header");

    return (
      <div className="relative flex justify-end items-center gap-4 h-[64px]">
        <div className="flex items-center gap-5">
          {/* Search field section */}
          <div className="relative w-[38.8125rem] h-[3.125rem] text-left text-[0.88rem] text-white font-archivo rounded-[10px]">
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[0rem] left-[20.94rem] shadow-[4px_6px_20px_-1px_rgba(16,_69,_153,_0.1)] w-[3.13rem] h-[3.13rem]">
              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%]">
                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-3xs bg-selections-header" />
              </div>
              <img
                className="absolute h-[54%] w-[52%] top-[20%] right-[20%] bottom-[26%] left-[28%] max-w-full overflow-hidden max-h-full"
                alt=""
                src="/assets/icons/icon-header-notification.svg"
              />
            </button>
            <div className="absolute top-[0rem] left-[25.31rem] rounded-3xs bg-selections-header shadow-[4px_6px_20px_-1px_rgba(16,_69,_153,_0.08)] w-[13.5rem] h-[3.13rem]">
              <div className="absolute top-[0.5rem] left-[1rem] w-[9.82rem] h-[2.13rem]">
                <img
                  className="absolute top-[0rem] left-[0rem] w-[2.13rem] h-[2.13rem] object-cover"
                  alt=""
                  src="/assets/icons/icon-generic-avatar.svg"
                />
                <div
                  className="absolute top-[0.19rem] left-[2.65rem] tracking-[-0.01em] font-medium inline-block w-[7.18rem] text-selections-fullName"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {fullName}
                </div>
                <div className="absolute top-[1.23rem] left-[2.65rem] text-[0.75rem] tracking-[-0.01em] text-selections-team inline-block w-[7.18rem]">
                  {teamName}
                </div>
              </div>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="absolute h-[1.5rem] w-[2rem] top-[70%] left-[90%] transform -translate-x-1/2 -translate-y-1/2 bg-selections-header max-w-full overflow-hidden max-h-full"
              >
                <i className="fas fa-chevron-down w-full h-full text-selections-team transition-colors duration-200 ease-in-out hover:text-menu-text-color"></i>{" "}
                {/* Font Awesome Arrow Down */}
              </button>
              {dropdownOpen && (
                <div className="absolute w-[13.5rem] h-auto mt-[3.13rem] rounded-3xs bg-white shadow-lg transition-all duration-300 ease-in-out z-50">
                  <button
                    onClick={handleMyAccount}
                    className="block w-full px-4 py-2 text-left text-menu-text-color bg-menu-background hover:bg-menu-hover"
                  >
                    Minha Conta
                  </button>
                  <button
                    onClick={handleConfigurations}
                    className="block w-full px-4 py-2 text-left text-menu-text-color bg-menu-background hover:bg-menu-hover"
                  >
                    Configurações
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-menu-text-color bg-menu-background hover:bg-menu-hover"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
            <div className="relative rounded-3xs w-[19.69rem] h-[3.13rem] ">
              <img
                className="absolute z-10 top-[0.88rem] left-[0.5rem] w-[1.38rem] h-[1.38rem] overflow-hidden"
                alt=""
                src="/assets/icons/icon-search-symbol.svg"
              />
              <input
                className="[border:none] font-archivo-expanded text-[0.88rem] pl-[3rem] absolute inset-0 rounded-3xs bg-selections-header text-white"
                placeholder={translations("search")}
                type="text"
                //   onChange={(e) => setFilterValue(e.target.value)}
              />
            </div>
          </div>
        </div>
        <LocaleSwitcher />
      </div>
    );
  }
);

export default HeaderSection;
