import { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useValidation } from '../../modules/Validator';
import { useBlocklyContext } from '../../contexts/BlocklyContext';

interface ScenarioProps {
    md: string;
    scenPath: string;
    totalVids: number;
    valSync: boolean;
    scenarioRequirements: [string[], string][];
    setScenCompleteSync: (value: boolean) => void;
}

const Scenario = ({
    md,
    scenPath,
    totalVids,
    valSync,
    scenarioRequirements,
    setScenCompleteSync,
}: ScenarioProps) => {
    const useVA = useValidation();
    const useBL = useBlocklyContext();

    const [idx, setIdx] = useState(0);
    const [validatedList, setValidatedList] = useState<boolean[]>([]);
    const [valid, setValid] = useState(false);
    const [inIntro, setInIntro] = useState(true);

    useEffect(() => {
        setInIntro(true);
        setIdx(0);
        setValidatedList([]);
        setValid(false);

        useBL.loadWorkspaceFile('');
        useVA.setRequirements(scenarioRequirements[0][0], scenPath + scenarioRequirements[0][1]);
    }, [scenPath, useBL, useVA, scenarioRequirements]);

    useEffect(() => {
        if (!inIntro) {
            if (idx < totalVids) {
                const tmp = [...validatedList];
                tmp[idx] = true;
                setValidatedList(tmp);

                if (idx + 1 === totalVids) {
                    setScenCompleteSync(true);
                } else {
                    setValid(true);
                }
            }
        }
    }, [valSync, inIntro, idx, totalVids, validatedList, setScenCompleteSync]);

    useEffect(() => {
        useVA.setRequirements(
            scenarioRequirements[idx][0],
            scenPath + scenarioRequirements[idx][1]
        );
    }, [idx, useVA, scenarioRequirements, scenPath]);

    const start = () => {
        setInIntro(false);
    };

    const onClickShowSolution = () => {
        useBL.loadWorkspaceFile(scenPath + 'Blocks/' + idx + '.json');
    };

    const onClickNext = () => {
        useBL.loadWorkspaceFile('');
        setIdx(idx + 1);
        setValid(false);
    };

    return (
        <Container>
            <ProgressBar
                variant="success"
                now={(validatedList.filter(Boolean).length / totalVids) * 100}
                label={validatedList.filter(Boolean).length + '/' + totalVids}
                style={{ marginBottom: '20px' }}
            />
            {inIntro ? (
                <>
                    <Container
                        style={{ maxWidth: 'none' }}
                        dangerouslySetInnerHTML={{ __html: md }}
                    />
                    <Container
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            marginTop: '10px',
                        }}
                    >
                        <Button variant="success" onClick={() => start()}>
                            Εκκίνηση Σεναρίου
                        </Button>
                    </Container>
                </>
            ) : (
                <>
                    <Container>
                        <Container
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                            }}
                        >
                            {validatedList.filter(Boolean).length !== totalVids ? (
                                <></>
                            ) : (
                                <h2>Συγχαρητήρια!</h2>
                            )}
                        </Container>
                        <Container
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                            }}
                        >
                            <video
                                src={
                                    validatedList.filter(Boolean).length !== totalVids
                                        ? scenPath + 'Videos/' + String(idx) + '.m4v'
                                        : scenPath + 'Videos/end.m4v'
                                }
                                width="75%"
                                controls={true}
                                autoPlay={true}
                            />
                        </Container>
                    </Container>
                    <Container
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            marginTop: '10px',
                        }}
                    >
                        {validatedList.filter(Boolean).length !== totalVids ? (
                            <Button variant="secondary" onClick={() => onClickShowSolution()}>
                                Δείξε την λύση
                            </Button>
                        ) : (
                            <></>
                        )}
                        {valid ? (
                            <Button
                                variant="success"
                                onClick={() => onClickNext()}
                                style={{ marginLeft: '10px' }}
                            >
                                Επόμενο
                            </Button>
                        ) : (
                            <></>
                        )}
                    </Container>
                </>
            )}
        </Container>
    );
};

export default Scenario;
