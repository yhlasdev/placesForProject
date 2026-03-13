import { Box } from "@mui/material"
import { getSubDocuments } from "../../api/queries/getters";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../../shared/Loader/Loader";
import { SubDocumentCard } from "../subDocumentCard";


export const HomeDocuments = ({ guid }) => {

    const { data: subDocuments = [], isLoading, isError, error } = useQuery({
        queryKey: ['subdocuments', guid],
        queryFn: async () => await getSubDocuments(guid),
    });

    const allSubDocuments = subDocuments?.data?.data;

    if (isLoading) return <Loader />
    if (isError) return <Box> Maglumat almakda ýalňyşlyk </Box>

    return (
        <Box className='flex flex-wrap -m-1'>
            {
                allSubDocuments?.map(item => (
                    <SubDocumentCard item={item} />
                ))
            }
        </Box>
    )
}