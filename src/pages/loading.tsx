import {ClipLoader} from "react-spinners";
import {CSSProperties} from "react";

const override: CSSProperties = {
    display: 'block',
    margin: 'auto',
    position: 'fixed',
    transform: 'translate(-50%, -50%)',
};

export function Loading() {
    return (

        <div style={{height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <ClipLoader
                color={"#FFFFFF"}
                loading={true}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
}
