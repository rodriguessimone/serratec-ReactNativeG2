import React from 'react'
import AxiosInstance from '../../api/AxiosInstance';

import { AutenticacaoContext } from '../../context/AutenticacaoContext';
import { ActivityIndicator, ScrollView, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Icon, Image, Input } from 'react-native-elements';
import Text from '../../components/Text';

import CategoriaType from '../../models/CategoriaType';
import ProdutoType from '../../models/ProdutoType';

import CategoriaButton from '../../components/CategoriaButton';
import ProdutoCard from '../../components/ProdutoCard';

import styles from './styles';
import { FlatList } from 'react-native-gesture-handler';

const Home = ({ navigation }: any) => {

  const { usuario } = React.useContext(AutenticacaoContext);

  const [categorias, setCategorias] = React.useState<CategoriaType[]>([]);
  const [produtos, setProdutos] = React.useState<ProdutoType[]>([]);

  const [categoriasIsLoading, setCategoriasIsLoading] = React.useState(true);
  const [produtosIsLoading, setProdutosIsLoading] = React.useState(true);

  const [search, setSearch] = React.useState('');

  const [produtosSearch, setProdutosSearch] = React.useState([]);

  const getDadosCategorias = async () => {
    AxiosInstance
      .get('/categoria', { headers: { "Authorization": `Bearer ${usuario.token}` } })
      .then(result => {
        setCategorias(result.data);
        setCategoriasIsLoading(false);
      })
      .catch((error) => {
        console.log('Erro ao carregar a lista de categorias: ' + JSON.stringify(error))
      });
  }

  const getDadosProdutos = async () => {
    AxiosInstance
      .get('/produto', { headers: { "Authorization": `Bearer ${usuario.token}` } })
      .then(result => {
        setProdutos(result.data);
        setProdutosIsLoading(false);
      })
      .catch((error) => {
        console.log('Erro ao carregar a lista de produtos: ' + JSON.stringify(error))
      });
  }

  const getDadosProdutosBusca = async () => {
    AxiosInstance.get(`/produto/busca?keyword=${search}`, {
      headers: { Authorization: `Bearer ${usuario.token}` },
    })
      .then(result => {
        setProdutosSearch(result.data);
      })
      .catch(error => {
        console.log(
          'Erro ao carregar a lista de produtos - ' + JSON.stringify(error),
        );
      });
  };

  const pesquisarProduto = (search: string) => {
    if (search !== '') {
      getDadosProdutosBusca();
    } else {
      setProdutosSearch([]);
    }
  };

  const handleOfferPress = () => {
    return null; //TODO
  };

  const handleSearchPress = () => {
    return null; //TODO
  };

  React.useEffect(() => {
    pesquisarProduto(search);
  }, [search]);

  React.useEffect(() => {
    getDadosCategorias();
    getDadosProdutos();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.body}>
      <View>
        <Input
          placeholder="Buscar Produto"
          onChangeText={setSearch}
          inputContainerStyle={styles.searchInput}
          inputStyle={styles.searchInputText}
          value={search}
          autoCompleteType={undefined}
          errorStyle={{ display: 'none' }}
          leftIcon={
            <Icon
              name='search'
              color='#dc1e3e'
              type="font-awesome"
              size={24}
              containerStyle={styles.searchIcon}
              tvParallaxProperties={undefined}
            />
          }
        />
      </View>
      {produtosSearch.length < 1 ? null :
        <View style={styles.searchResults}>
          {
            produtosSearch.map((k, i) => (
              <TouchableHighlight key={i} activeOpacity={1} underlayColor={'#dc1e3e'}>
                <Text
                  style={styles.searchResult}
                  onPress={handleSearchPress}
                >
                  {k.nomeProduto}
                </Text>
              </TouchableHighlight>))
          }
        </View>
      }
      <View style={styles.offer}>
        <TouchableOpacity onPress={handleOfferPress}>
          <Image
            source={require('../../assets/offerImage.png')}
            style={styles.offerImage}
            width={undefined}
            height={undefined}
          >
            <Text style={styles.offerText}>Oferta Imperdível 50% Off</Text>
          </Image>
        </TouchableOpacity>
      </View>
      <Text style={styles.titleCategorias}>Categorias</Text>
      {categoriasIsLoading ?
        <ActivityIndicator size='large' color='#DC1E3E' />
        :
        <FlatList
          horizontal={true}
          style={styles.categoriasContainer}
          data={categorias}
          keyExtractor={(k, i) => i.toString()}
          renderItem={response => <CategoriaButton categoria={response.item} navigation={navigation} styles={styles} />}
          ItemSeparatorComponent={
            () => <View style={{ width: 16 }} />
          }
        />
      }
      <Text style={styles.titleProdutos}>Produtos</Text>
      {produtosIsLoading ?
        <ActivityIndicator size='large' color='#DC1E3E' />
        :
        <FlatList
          horizontal={true}
          style={styles.produtosContainer}
          data={produtos}
          keyExtractor={(k, i) => i.toString()}
          renderItem={response => <ProdutoCard produto={response.item} navigation={navigation} styles={styles} />}
          ItemSeparatorComponent={
            () => <View style={{ width: 10 }} />
          }
        />
      }
    </ScrollView>
  )
}

export default Home;