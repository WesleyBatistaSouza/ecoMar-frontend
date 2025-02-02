import Header from "../../components/header/header";
import axios from "axios";
import { useEffect, useState } from "react";

const baseUrl = import.meta.env.VITE_URL_API;


function Home() {
    const [report, setReport] = useState({ totalPoints: 0, totalUsers: 0, totalEvents: 0 });

useEffect(() => {
    const fetchReport = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/report`);
            setReport(response.data);
        } catch (error) {
            console.error("Failed to fetch report:", error);
        }
    };

    fetchReport();
}, []);

    return (
        <>
            <Header />
            <main className="mt-20 mx-auto flex flex-col lg:flex-row items-center justify-center gap-6">
            <div className="w-full lg:w-3/5 lg:pr-8 text-left">
                <article className="mx-4 md:mx-12 lg:mx-20">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wide text-[#333333] leading-tight mb-6">
                        Preservando os Oceanos: <br /> Coleta de Lixo Marítimo com Sustentabilidade
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
                        Unimos forças para combater a poluição dos oceanos, promovendo a coleta de <br /> lixo marítimo e ações que protegem a vida marinha.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4">
                        <a
                            href="/events"
                            className="inline-flex justify-center px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-3 rounded-full border-4 border-[#00A8A8] text-[#0A2F51] text-sm md:text-[16px] font-bold duration-300 focus:ring-4 focus:ring-gray-300 focus:outline-none"
                        >
                            Eventos
                        </a>
                        <a
                            href="/points"
                            className="inline-flex justify-center px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-3 rounded-full border-4 border-[#00A8A8] text-white text-sm md:text-[16px] font-bold duration-300 hover:text-white bg-[#0A2F51] hover:bg-[#0A2438] focus:ring-4 focus:ring-gray-300 focus:outline-none"
                        >
                            Visualizar Pontos
                        </a>
                    </div>
                </article>
            </div>
                <div className="lg:w-2/5 flex justify-center lg:justify-center pt-8">
                    <img
                        src={'/image/img-main.svg'}
                        alt="Imagem de coleta de lixo marítimo"
                        className="hidden lg:block w-full max-w-md h-auto"
                    />
                </div>
            </main>
            <div className="flex items-center justify-center mt-10">
                <div className="flex flex-wrap text-center justify-center gap-7 py-8 px-6 lg:py-4 lg:px-10">
                    <div className="mx-4">
                        <span className="block text-4xl font-bold text-[#333333]">
                        {String(report.totalPoints).padStart(3, '0')}
                        </span>
                        <span className="block text-[#828282]">
                            Pontos Cadastrados
                        </span>
                    </div>
                    <div className="mx-4">
                        <span className="block text-4xl font-bold text-[#333333]">
                        {String(report.totalUsers).padStart(3, '0')}
                        </span>
                        <span className="block text-[#828282]">
                            Usuários Ativos
                        </span>
                    </div>
                    <div className="mx-4">
                        <span className="block text-4xl font-bold text-[#333333]">
                        {String(report.totalEvents).padStart(3, '0')}
                        </span>
                        <span className="block text-[#828282]">
                            Eventos Cadastrados
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
