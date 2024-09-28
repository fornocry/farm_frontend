import {InventoryInfo} from "../../../entities/plant.tsx";

export function InvPlace({invInfo}: { invInfo: InventoryInfo }) {
    return (
        <div
            className="w-full border-t border-b border-l border-[#6EA0AF] border-[0.75px] bg-white z-20 rounded-[10px] mb-1">
            <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                    <div className="relative p-2">
                        <div
                            className="w-[6vh] aspect-square rounded-[10px] flex items-center justify-center"
                            style={{
                                backgroundColor: invInfo?.plant?.place_color,
                                border: `0.753px solid ${invInfo?.plant?.border}`
                            }}
                        >
                            <img src={invInfo.plant.icon} className="h-[70%] object-contain" alt={invInfo.plant.name}/>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <p className="font-NeueHaas font-semibold" style={{color: invInfo?.plant?.text_color}}>
                            {invInfo.plant.name}
                        </p>
                        <p className="font-NeueHaas font-semibold ml-2 text-textGray">(x{invInfo.quantity})</p>
                    </div>
                </div>
                <div className="pr-5">
                    <img
                        src="/svgs/navarrow.svg"
                        className="h-6 bg-navArrow rounded-[6px] flex items-center justify-center"
                        alt="Navigation arrow"
                    />
                </div>
            </div>
        </div>
    )
}

// const InventoryItem = ({ icon, name, count, color }) => {
//     return (
//         <div className="w-full bg-white rounded-lg shadow-sm mb-2 overflow-hidden">
//             <div className="flex items-center p-2">
//                 <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${color === 'red' ? 'bg-pink-100' : color === 'yellow' ? 'bg-yellow-100' : color === 'green' ? 'bg-green-100' : 'bg-gray-100'}`}>
//                     <span className="text-2xl">{icon}</span>
//                 </div>
//                 <div className="flex-grow">
//                     <p className={`font-semibold ${color === 'red' ? 'text-red-500' : color === 'yellow' ? 'text-yellow-600' : color === 'green' ? 'text-green-600' : 'text-gray-600'}`}>
//                         {name}
//                     </p>
//                 </div>
//                 <div className="text-gray-500">
//                     (x{count})
//                 </div>
//                 <button className="ml-2 text-gray-400">
//                     ▶
//                 </button>
//             </div>
//         </div>
//     );
// };