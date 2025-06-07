import HalfSection from "../../components/shared/HalfSection";
import Header from "../../components/shared/Header";

const TeamsPage = () => {
  return (
    <HalfSection>
      <Header isTextWhite={true}>Teams</Header>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-20">
        <div className="flex flex-col items-center gap-5">
          <img
            className="rounded-full h-28"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdFR7JYNV9f3UfiJK2rMDZmrFpKsLb1jFgJA&s"
            alt=""
          />
          <p className="font-semibold">OKC THUNDER</p>
        </div>
        <div className="flex flex-col items-center gap-5">
          <img
            className="rounded-full h-28"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdFR7JYNV9f3UfiJK2rMDZmrFpKsLb1jFgJA&s"
            alt=""
          />
          <p className="font-semibold">OKC THUNDER</p>
        </div>
        <div className="flex flex-col items-center gap-5">
          <img
            className="rounded-full h-28"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdFR7JYNV9f3UfiJK2rMDZmrFpKsLb1jFgJA&s"
            alt=""
          />
          <p className="font-semibold">OKC THUNDER</p>
        </div>
        <div className="flex flex-col items-center gap-5">
          <img
            className="rounded-full h-28"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdFR7JYNV9f3UfiJK2rMDZmrFpKsLb1jFgJA&s"
            alt=""
          />
          <p className="font-semibold">OKC THUNDER</p>
        </div>
        <div className="flex flex-col items-center gap-5">
          <img
            className="rounded-full h-28"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdFR7JYNV9f3UfiJK2rMDZmrFpKsLb1jFgJA&s"
            alt=""
          />
          <p className="font-semibold">OKC THUNDER</p>
        </div>
      </div>
    </HalfSection>
  );
};

export default TeamsPage;
