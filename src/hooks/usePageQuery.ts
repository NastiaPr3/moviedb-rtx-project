import {useSearchParams} from "react-router-dom";

const usePageQuery = () => {

    const [query, setQuery] = useSearchParams({page: '1'});
    const page = query.get('page');

    return {
        page,
        pg: (val: any) => setQuery(prev => {
            prev.set('page', val.toString())
            return prev
        }),
    };
};


export {
    usePageQuery
};