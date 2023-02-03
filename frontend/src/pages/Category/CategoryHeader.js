import { useParams } from 'react-router-dom';
import {
  Text,
} from '@chakra-ui/react';


export default function CategoryHeader() {
  let { id } = useParams()

  return (
    <Text fontSize={"4xl"} pl={'8'}>
      {id.charAt(0).toUpperCase() + id.slice(1)}
    </Text>
  );
}