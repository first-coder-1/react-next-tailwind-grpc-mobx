import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { UserContext } from "../contexts/UserContext";

import { useAuth } from "../contexts/AuthContext";

// External components
import VerticalMenu from "../components/VerticalMenu";
import HeaderSection from "../components/HeaderSection";

import { useStore } from "stores/RootStore";
import { capitalizeFirstLetter } from "utils/common";
import FilterPanel from "components/Filters";
import Cookies from "js-cookie";

interface LayoutProps {
  children: React.ReactElement;
}

const Layout = observer<LayoutProps>(({ children }) => {
  const {
    filtersStore: { showFilters, toggleFilters },
  } = useStore();

  const userContext = useContext(UserContext);

  useEffect(() => {
    // If user is authenticaded, retrieves his informations
    const token = Cookies.get("idToken");
    if (token && userContext) {
      userContext.fetchUserInfo();
    }
  }, []);

  // User Context details
  let teamIconUrl = "";
  let teamName = "";
  let fullName = "";

  // TODO: Code - Implement pending funcionalities
  const { logout } = useAuth();

  const handleMyAccount = () => {
    alert(`Esta funcionalidade está em construção.`);
  };

  const handleConfigurations = () => {
    alert(`Esta funcionalidade está em construção.`);
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  // Recover user details from User Context
  if (userContext) {
    const { userInfo } = userContext;
    if (
      userInfo &&
      userInfo.team &&
      userInfo.team.icon &&
      userInfo.lastName &&
      userInfo.firstName
    ) {
      teamIconUrl = userInfo.team.icon;
      teamName = userInfo.team.name;
      const { lastName, firstName } = userInfo;
      fullName = `${capitalizeFirstLetter(firstName)} ${capitalizeFirstLetter(
        lastName
      )}`;
    }
  }

  // Rendering area
  return (
    <div className="h-[100vh] flex items-stretch bg-[#303030]">
      <VerticalMenu
        teamIconUrl={teamIconUrl}
        backgroundImageUrl="/assets/images/selections-vertical-menu.svg"
      />
      <FilterPanel />
      {!showFilters && (
        <div className="absolute top-[1.56rem] left-[6.375rem] font-semibold text-left text-[2.38rem] text-white font-mango-grotesque flex gap-4">
          <span className="text-">FILTROS</span>
          <button
            onClick={toggleFilters}
            className="cursor-pointer [border:none] p-0 bg-[transparent] w-[1.75rem] h-[1.81rem] mt-0.5 z-10"
          >
            <img
              alt={showFilters ? "Esconder Filtros" : "Mostrar Filtros"}
              src="/assets/images/button-expand-filter.svg"
            />
          </button>
        </div>
      )}
      <div className="flex-1 flex flex-col items-stretch px-10 gap-6 py-5">
        <HeaderSection
          fullName={fullName}
          teamName={teamName}
          handleMyAccount={handleMyAccount}
          handleConfigurations={handleConfigurations}
          handleLogout={handleLogout}
        />
        {children}
      </div>
    </div>
  );
});

export default Layout;
