import { TelephoneFill, GeoAltFill, EnvelopeFill } from "react-bootstrap-icons";
import { Stack } from "react-bootstrap";

const Contato = () => {
    return (
        <>
            <div style={{ maxWidth: '1000px', maxHeight: '800px', overflow: 'auto', margin: '0 auto', marginTop: '90px' }}>
                <div style={{ justifyContent: 'center', marginBottom: '20px' }}>
                    <h2 className="text-center mb-4" style={{ marginBottom: '20px' }}>Possui alguma dúvida ou sugestão? Entre em contato com a gente!</h2>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', flex: '1' }}>
                    <iframe width="640" height="480" src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=R.%20Gen.%20Canabarro,%20485%20-%20Maracan%C3%A3,%20Rio%20de%20Janeiro%20-%20RJ,%2020271-204+(Chapa%20Quente)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" style={{ width: "65%", height: "400px", border: "none", borderRadius: "8px", marginRight: '20px' }}></iframe>
                    <Stack direction="vertical" style={{ width: "35%" }}>
                        <div>
                            <h4>Endereço</h4>
                            <p><GeoAltFill style={{ marginRight: '10px' }} /> Rua General Canabarro, 485 - Maracanã, Rio de Janeiro - RJ, 20271-204</p>
                        </div>
                        <div>
                            <h4>Telefone</h4>
                            <p><TelephoneFill style={{ marginRight: '10px' }} /> +55 (21) 99999-9999</p>
                        </div>
                        <div>
                            <h4>Email</h4>
                            <p><EnvelopeFill style={{ marginRight: '10px' }} /> <a href="mailto:contato@chapa-quente.com">contato@chapa-quente.com</a></p>
                        </div>
                    </Stack>
                </div>
            </div>
        </>
    );
}

export default Contato;