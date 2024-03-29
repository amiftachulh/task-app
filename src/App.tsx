import KanbanBoard from "./components/KanbanBoard";
import Navbar from "./components/Navbar";
import ColumnsProvider from "./contexts/ColumnsContext";

function App() {
  return (
    <>
      <div className="fixed inset-0 z-[-1]">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 560">
          <g mask="url(&quot;#SvgjsMask1042&quot;)" fill="none" stroke="currentColor" strokeWidth="2" >
            <path d="M -837.8367546194895,246 C -741.84,274.6 -549.84,420.4 -357.83675461948945,389 C -165.84,357.6 -69.84,92.2 122.16324538051055,89 C 314.16,85.8 410.16,354.4 602.1632453805105,373 C 794.16,391.6 914.6,167.6 1082.1632453805105,182 C 1249.73,196.4 1368.43,392.4 1440,445" />
            <path d="M -298.8399860778011,72 C -202.84,152.4 -10.84,453.6 181.16001392219889,474 C 373.16,494.4 469.16,177.2 661.1600139221989,174 C 853.16,170.8 949.16,438.6 1141.160013922199,458 C 1333.16,477.4 1561.39,296.6 1621.160013922199,271 C 1680.93,245.4 1476.23,318.2 1440,330" />
            <path d="M -857.3550835162614,194 C -761.36,217 -569.36,294.2 -377.3550835162614,309 C -185.36,323.8 -89.36,265 102.6449164837386,268 C 294.64,271 390.64,357.6 582.6449164837386,324 C 774.64,290.4 891.17,102.8 1062.6449164837386,100 C 1234.12,97.2 1364.53,268 1440,310" />
            <path d="M -470.4022305103959,305 C -374.4,270.4 -182.4,106.4 9.597769489604104,132 C 201.6,157.6 297.6,422.8 489.5977694896041,433 C 681.6,443.2 777.6,174 969.5977694896042,183 C 1161.6,192 1355.52,499.6 1449.5977694896042,478 C 1543.68,456.4 1441.92,155.6 1440,75" />
          </g>
          <defs>
            <mask id="SvgjsMask1042">
              <rect width="1440" height="560" fill="#ffffff"></rect>
            </mask>
          </defs>
        </svg>
      </div>
      <ColumnsProvider>
        <Navbar />
        <KanbanBoard />
      </ColumnsProvider>
    </>
  );
}

export default App;
