import { IGithubRepository} from "../../assets/types/IGithubRepository";
import {useEffect, useState} from "react";

type Props ={
    org:string;
}


export default function useGithubRepositories({org}: Props) {


    const [repos, setRepos] = useState<IGithubRepository[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetch(`https://api.github.com/orgs/${org}/repos`)
            .then(r => r.json())
            .then((data) => {
                setRepos(data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [])
    return { repos, isLoading, error }
}
