import { InventoryInfo } from "../../../entities/plant.tsx";

export function InvPlace({ invInfo }: { invInfo: InventoryInfo }) {
    const { plant, quantity } = invInfo;
    const { place_color, border, icon, name, text_color } = plant;

    return (
        <div className="w-full border-t border-b border-l border-[#6EA0AF] border-[0.75px] bg-white z-20 rounded-[10px] mb-1">
            <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                    <div className="relative p-2">
                        <div className="w-[6vh] aspect-square rounded-[10px] flex items-center justify-center" style={{ backgroundColor: place_color, border: `0.753px solid ${border}` }}>
                            <img src={icon} className="h-[70%] object-contain" alt={name} />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <p className="font-NeueHaas font-semibold" style={{ color: text_color }}>{name}</p>
                        <p className="font-NeueHaas font-semibold ml-2 text-textGray">(x{quantity})</p>
                    </div>
                </div>
                <div className="pr-5">
                    <img src="/svgs/navarrow.svg" className="h-6 bg-navArrow rounded-[6px] flex items-center justify-center" alt="Navigation arrow" />
                </div>
            </div>
        </div>
    );
}
