import Carousel from "@/components/user/Carousel";
import Header from "../../components/user/Header";
import Slides from "@/components/user/Slides";
import { useEffect, useState } from "react";
import { getTeams } from "@/services/team";
const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      try {
        const response = await getTeams();
        setTeams(response);
      } catch (error) {
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <>
      <div className="min-h-[80vh] md:min-h-[60vh] lg:min-h-screen flex items-center relative">
        <div className="flex logo h-[80vh] md:h-[60vh] lg:h-[100vh] w-[56%] bg-[darkBlue] absolute left-0 z-0"></div>
        <div className="flex logo2 h-[80vh] md:h-[60vh] lg:h-[100vh] w-[56%] bg-[#eb2e4c] absolute right-0"></div>

        <div className="flex flex-col items-center gap-5 z-20 h-full w-full text-white py-5 px-5 xl:px-20">
          <Header subHeader={"TEAMS"} header={"OUR TEAMS"} />
          <p className="md:w-[50%] text-center">
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia
          </p>

          <Slides teams={teams} loading={loading} />
        </div>
      </div>
    </>
  );
};

export default TeamsPage;
