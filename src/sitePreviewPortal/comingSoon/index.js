import { Button } from "@newfold/ui-component-library";
import { SitePreview } from "../sitePreview";

export const ComingSoon = () => {
    console.log('comingSoon component');
    return (
        <div className="coming-soon-fill">
            <div className="nfd-flex nfd-flex-row nfd-gap-4">
                <div className="nfd-flex nfd-flex-col nfd-gap-2">
                    <h1>Your site is live!</h1>
                    <Button>View</Button>
                    <Button>Edit</Button>
                    <p>Not ready to share it?</p>
                    <Button>Enable Coming Soon</Button>
                </div>
                <div className="nfd-flex nfd-flex-col nfd-gap-2">
                    <SitePreview />
                </div>
            </div>

        </div>
    );
};