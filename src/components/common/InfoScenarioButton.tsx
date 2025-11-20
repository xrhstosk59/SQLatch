import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

interface InfoScenarioPopoverProps {
    title: string;
    body: React.ReactNode;
}

const InfoScenarioPopover = (title: string, body: React.ReactNode) => (
    <Popover id="popover-basic" data-bs-theme="dark">
        <Popover.Header as="h3" className="text-light">
            {title}
        </Popover.Header>
        <Popover.Body>{body}</Popover.Body>
    </Popover>
);

const InfoScenarioButton = ({ title, body }: InfoScenarioPopoverProps) => (
    <OverlayTrigger
        trigger={['hover', 'focus']}
        placement="right"
        overlay={InfoScenarioPopover(title, body)}
    >
        <i style={{ padding: '1%' }} className="bi bi-info-circle"></i>
    </OverlayTrigger>
);

export default InfoScenarioButton;
