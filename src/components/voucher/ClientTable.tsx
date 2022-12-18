//Define the expected props
import React from "react";
import {Header, Icon, Message, Search, Table} from "semantic-ui-react";
import {VoucherClient} from "../../models/VoucherClient";
import {voucherClientService} from "../../services/voucherClient.service";
import {SearchProps, SearchResultData} from "semantic-ui-react/dist/commonjs/modules/Search/Search";
import {EmptyAddress} from "../../models/Address";

interface IncomingProps {
    clientIds: number[];

    //Pass in the function to update the list
    updateList: (clientIds: number[]) => any;
}

interface State {
    clients: { [key: number]: VoucherClient; }
    error: string | undefined;

    searchLoading: boolean;
    searchResults: SearchResult[];
    searchTerm: string;
}

class ClientTable extends React.Component<IncomingProps, State> {
    state = {
        clients: {} as { [key: number]: VoucherClient; },
        error: undefined,
        searchLoading: false,
        searchResults: [] as SearchResult[],
        searchTerm: ""
    };

    fetchClients() {
        for (let id of this.props.clientIds) {
            voucherClientService.getClient(id).then(
                client => {
                    this.setState({clients: {...this.state.clients, [client.id]: client}})
                },
                //If there was an error, show to the user
                errorResponse => {
                    //Dispatch the error
                    try {
                        this.setState({error: errorResponse.response.data.message});
                    } catch (e) {
                        this.setState({error: errorResponse.toString()});
                    }
                }
            )
        }
    }

    componentDidMount() {
        this.fetchClients();
    }

    componentDidUpdate(prevProps: IncomingProps) {
        if (this.props.clientIds.length !== prevProps.clientIds.length) {
            this.fetchClients();
            return;
        }
        for (let i in this.props.clientIds) {
            if (this.props.clientIds[i] !== prevProps.clientIds[i]) {
                this.fetchClients();
                return;
            }
        }
    }

    deletePerson = (deleteId: number) => {
        this.props.updateList(this.props.clientIds.filter((currentId) => {
            return deleteId !== currentId;
        }))
    }

    getEmptyPerson = (): VoucherClient => {
        return {
            id: -1,
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            group: "",
            address: EmptyAddress(),
            notes: ""
        }
    }

    addSearchResult = (event: React.MouseEvent<HTMLDivElement>, data: SearchResultData) => {
        this.props.updateList([...this.props.clientIds, data.result?.id]);
    }

    handleSearchChange = (event: React.MouseEvent<HTMLElement>, data: SearchProps) => {
        const searchTerm = data.value ?? "";
        this.setState({searchLoading: true, searchTerm: searchTerm})

        if (searchTerm.length > 3) {
            voucherClientService.searchForClients(searchTerm).then(
                clients => {
                    let results: SearchResult[] = clients.map(client => {
                        return {
                            title: client.firstName + client.lastName,
                            description: client.email,
                            id: client.id
                        }
                    });
                    this.setState({searchResults: results, searchLoading: false})
                }
            );

        }
    }

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {

        return (
            <>
                <p>Search for existing clients.</p>
                <Search
                    loading={this.state.searchLoading}
                    results={this.state.searchResults}
                    onSearchChange={this.handleSearchChange}
                    value={this.state.searchTerm}
                    onResultSelect={this.addSearchResult}
                    minCharacters={4}
                >
                </Search>
                {this.props.clientIds.length > 0 &&
                    <Table basic='very'>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Email</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {/*Make each row*/}
                            {
                                this.props.clientIds.map((clientId: number) => {
                                    const client = this.state.clients[clientId];
                                    if (client) {
                                        return (
                                            <Table.Row key={client.id}>
                                                <Table.Cell>
                                                    <Header as='h4'>
                                                        {client.firstName} {client.lastName}
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {client.email}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {/*<ClientPersonalModal*/}
                                                    {/*    key={client.id}*/}
                                                    {/*    icon='edit'*/}
                                                    {/*    initPerson={client}*/}
                                                    {/*    savePerson={(person: VoucherClient) => {*/}
                                                    {/*        this.updatePerson(person);*/}
                                                    {/*    }}*/}
                                                    {/*/>*/}

                                                    <Icon name='delete' size='large' onClick={() => {
                                                        this.deletePerson(client.id)
                                                    }}/>
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    } else {
                                        return (
                                            <Table.Row key={clientId}>
                                                <Table.Cell>
                                                </Table.Cell>
                                            </Table.Row>
                                        );
                                    }
                                })
                            }

                        </Table.Body>
                    </Table>
                }
                {this.state.error !== undefined &&
                    <Message>
                        {this.state.error}
                    </Message>
                }
                {/*<ClientPersonalModal*/}
                {/*    trigger={<Form.Field control={Button} size='tiny' icon='add'>Create New Client</Form.Field>}*/}
                {/*    initPerson={this.getEmptyPerson()}*/}
                {/*    savePerson={(person:VoucherClient) => {this.updatePerson(person)}}*/}
                {/*/>*/}
            </>
        );
    }
}

interface SearchResult {
    title: string;
    description: string;
    id: number;
}

export default ClientTable;
