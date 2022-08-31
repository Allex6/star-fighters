export default function(error: any){

    const result = error.details.map((item: { message: any; }) => item.message);
    return result;

};