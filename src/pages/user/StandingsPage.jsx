import React from "react";
import Section from "../../components/user/Section";
import Header from "../../components/shared/Header";

const StandingsPage = () => {
  return (
    <Section background="bg-[#23284c]">
      <Header isTextWhite={true}>Game Standings</Header>
      <div className="flex flex-col gap-5 w-full">
        <div className="flex overflow-x-auto lg:justify-center gap-5">
          <button className="px-5 py-2 bg-[#0034a7] text-white rounded-2xl">
            Overall
          </button>
          <button className="px-5 py-2 bg-[#0034a7] text-white rounded-2xl">
            Basketball
          </button>
          <button className="px-5 py-2 bg-[#0034a7] text-white rounded-2xl">
            Volleyball
          </button>
          <button className="px-5 py-2 bg-[#0034a7] text-white rounded-2xl">
            Soccer
          </button>
          <button className="px-5 py-2 bg-[#0034a7] text-white rounded-2xl">
            Badminton
          </button>
          <button className="px-5 py-2 bg-[#0034a7] text-white rounded-2xl">
            Tenis
          </button>
        </div>

        <div className="w-full border border-y-[#FABB00] overflow-x-auto">
          <table className="border-collapse w-full">
            <thead className="border border-[#FABB00]">
              <tr>
                <th className="border border-[#FABB00] bg-[#FABB00] px-5 py-4">
                  Rank
                </th>
                <th className="border border-[#FABB00] bg-[#FABB00] px-5 py-4">
                  Name
                </th>
                <th className="border border-[#FABB00] bg-[#FABB00] px-5 py-4">
                  Points
                </th>
                <th className="border border-[#FABB00] bg-[#FABB00] px-5 py-4">
                  Type
                </th>
                <th className="border border-[#FABB00] bg-[#FABB00] px-5 py-4">
                  Total
                </th>
              </tr>
            </thead>

            <tbody className="border border-b-[#FABB00]">
              <tr className="bg-[#2a305c] ">
                <td className="border border-x-[#FABB00] border-y-[#23284c] px-5 py-4 text-center text-white">
                  1
                </td>
                <td className="border border-x-[#FABB00] border-y-[#23284c] px-5 py-4 text-center text-white">
                  L.A. Lakers
                </td>
                <td className="border border-x-[#FABB00] border-y-[#23284c] px-5 py-4 text-center text-white">
                  1
                </td>
                <td className="border border-x-[#FABB00] border-y-[#23284c] px-5 py-4 text-center text-white">
                  Basketball
                </td>
                <td className="border border-x-[#FABB00] border-y-[#23284c] px-5 py-4 text-center text-white">
                  105
                </td>
              </tr>
              <tr className="bg-[#23284c]">
                <td className="border border-x-[#FABB00] border-y-[#23284c] px-5 py-4 text-center text-white">
                  2
                </td>
                <td className="border border-x-[#FABB00] border-y-[#23284c] px-5 py-4 text-center text-white">
                  OKC Thunder
                </td>
                <td className="border border-x-[#FABB00] border-y-[#23284c] px-5 py-4 text-center text-white">
                  2
                </td>
                <td className="border border-x-[#FABB00] border-y-[#23284c] px-5 py-4 text-center text-white">
                  Basketball
                </td>
                <td className="border border-x-[#FABB00] border-y-[#23284c] px-5 py-4 text-center text-white">
                  90
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
};

export default StandingsPage;
