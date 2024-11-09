import React, { useRef, useState } from 'react';
import { Box, Typography, Button, Paper, Grid, Card, CardHeader, CardContent } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { Verdict } from 'src/models/verdict';
import { logo, signature } from 'src/assets/imagePath';
import html2pdf from 'html2pdf.js';

interface VerdictProps {
  verdict: Verdict | null;
  city_of_birth: string;
  sexe: string;
  studentInfos: any;
}

const VerdictComponent: React.FC<VerdictProps> = ({ verdict, sexe, city_of_birth, studentInfos }) => {
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handleDownload = () => {
    const element = componentRef.current;
    if (element) {
      const opt = {
        margin: 1,
        filename: `${studentInfos.name}-verdict.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 4 },
        pagebreak: { mode: ['css', 'legacy'] },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };
      html2pdf().from(element).set(opt).save();
    }
  };

  if (!verdict || Object.keys(verdict).length === 0) {
    return (
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" align="center" sx={{ mt: 2 }}>
          Aucun verdict généré pour cet élève.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Paper
        ref={componentRef}
        sx={{
          width: { xs: '100%', sm: '210mm' },
          minHeight: '247mm',
          padding: '45px',
          marginTop: '16px',
          boxSizing: 'border-box',
        }}
      >

        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="h6" sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
              République du Cameroun
            </Typography>
            <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
              <i>Paix - Travail - Patrie</i>
            </Typography>
            <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
              Odza, Yaoundé, Cameroun
            </Typography>
          </Box>
          <Box>
            <img src={logo} alt="Logo" width="150" />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
              Republic of Cameroon
            </Typography>
            <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
              <i>Peace - Work - Fatherland</i>
            </Typography>
            <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
              Odza, Yaoundé, Cameroon
            </Typography>
          </Box>
        </Box>

        <Box sx={{ marginTop: '32px', paddingTop: '16px' }}>
          <Typography variant="h6" align="center" sx={{ backgroundColor: 'primary.main', color: 'white', padding: '8px' }}>
            VERDICT PREVISIONNEL D'OSIA
          </Typography>
          <Typography sx={{ mt: 2, ml: 1 }}>
            Nom : <strong>{studentInfos.name}</strong> <br />
            Classe : <strong>{studentInfos.class_name}</strong> <br />
            Établissement : <strong>{studentInfos.school_name}</strong> <br />
            {/* Lieu de naissance : <strong>{city_of_birth}</strong> <br />
            Sexe : <strong>{sexe === 'm' ? 'Masculin' : 'Féminin'}</strong> */}
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ marginTop: '32px' }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ minHeight: '150px' }}>
              <CardHeader
                title="PROFIL LITTÉRAIRE"
                sx={{ backgroundColor: 'primary.main', color: 'white', textAlign: 'center' }}
              />
              <CardContent>
                <Typography>{verdict.literary_profile}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ minHeight: '150px' }}>
              <CardHeader title="PROFIL TECHNIQUE" sx={{ backgroundColor: 'warning.main', color: 'white', textAlign: 'center' }} />
              <CardContent>
                <Typography>{verdict.technical_profile}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ minHeight: '150px' }}>
              <CardHeader title="PROFIL SCIENTIFIQUE" sx={{ backgroundColor: 'grey.700', color: 'white', textAlign: 'center' }} />
              <CardContent>
                <Typography>{verdict.scientific_profile}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ minHeight: '150px' }}>
              <CardHeader title="PROFIL PSYCHOLOGIQUE" sx={{ backgroundColor: 'success.main', color: 'white', textAlign: 'center' }} />
              <CardContent>
                <Typography>{verdict.psychological_profile}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ marginTop: '32px', paddingTop: '16px' }}>
          <Typography variant="h6" align="center" sx={{ backgroundColor: 'info.main', color: 'white', padding: '8px' }}>
            MODELE DE REUSSITE
          </Typography>
          <Typography sx={{ padding: '10px', textAlign: 'justify' }}>{verdict.success_model}</Typography>
        </Box>

        <div className="page-break" style={{ pageBreakBefore: 'always'}}></div>

        <Box sx={{ marginTop: '32px', paddingTop: '16px' }}>
          <Typography variant="h6" align="center" sx={{ backgroundColor: 'success.main', color: 'white', padding: '8px' }}>
            ORIENTATION D'OSIA
          </Typography>
          <Typography sx={{ padding: '10px', textAlign: 'justify' }}>{verdict.orientation}</Typography>
        </Box>

        <Box sx={{ marginTop: '32px', paddingTop: '16px' }}>
          <Typography variant="h6" align="center" sx={{ backgroundColor: 'warning.main', color: 'white', padding: '8px' }}>
            INTERPRETATION D'OSIA
          </Typography>
          <Typography sx={{ padding: '10px', textAlign: 'justify' }}>{verdict.interpretation}</Typography>
        </Box>

        <Box sx={{ marginTop: '62px', textAlign: 'right', fontWeight: 'bold', fontSize: '15px' }}>
          Signature CEO
          <Box sx={{ mr: 3 }}>
            <img src={signature} alt="Signature" width="60" />
          </Box>
        </Box>



        {/* Espace pour afficher les sponsors */}
        



        <Box sx={{ marginTop: '42px' }}>
          <Typography variant="h6" sx={{ textAlign: 'center', backgroundColor: 'secondary.main', color: 'white', padding: '8px' }}>
            Avis des Parents
          </Typography>
          <Box sx={{ padding: '16px' }}>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, borderBottom: '1px dashed black', pb: 1 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Typography
                  key={star}
                  variant="h6"
                  sx={{
                    color: 'white',
                    WebkitTextStroke: '1px black',
                    fontSize: '25px',
                  }}
                >
                  &#9733;
                </Typography>
              ))}
            </Box>



            <Box sx={{ padding: '10px', border: '1px dashed black', height: '100px', mt: 2 }}></Box>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ textAlign: 'center', marginTop: '16px' }}>
        <Button variant="contained" color="primary" startIcon={<PrintIcon />} onClick={handleDownload}>
          Télécharger
        </Button>
      </Box>
    </Box>
  );
};

export default VerdictComponent;
