import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import useGlobal from "../../../hooks/useGlobal";

const steps = [
  {
    label: "Cadastre-se",
    description: `Por favor, escreva seu nome e e-mail`,
  },
  {
    label: "Escolha uma senha",
    description: "Escolha uma senha segura",
  },
  {
    label: "Cadastro realizado com sucesso",
    description: `E-mail e senha cadastrados com sucesso`,
  },
];

function StepperIcon({ active, completed, className }) {
  const inactive = !active && !completed;

  return (
    <svg
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="16"
        cy="16.5"
        r="16"
        fill={!inactive && "#0E8750"}
        stroke="#0E8750"
      />
      {inactive && <circle cx="15.9998" cy="16.5" r="3.2" fill="#0E8750" />}
      {active && <circle cx="15.9998" cy="16.5" r="3.2" fill="#F0F0F5" />}
      {completed && (
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M23.7016 10.7165C24.0686 11.031 24.1016 11.5728 23.7755 11.9266L14.294 22.2123C14.1253 22.3953 13.8835 22.5 13.6296 22.5C13.3757 22.5 13.134 22.3953 12.9653 22.2123L8.22453 17.0695C7.89839 16.7156 7.93143 16.1739 8.29835 15.8594C8.66527 15.5449 9.22711 15.5767 9.55326 15.9306L13.6296 20.3527L22.4467 10.7877C22.7729 10.4339 23.3347 10.402 23.7016 10.7165Z"
          fill="#F8F8F9"
        />
      )}
    </svg>
  );
}

export default function VerticalStepper() {
  const { activeStep } = useGlobal();

  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel StepIconComponent={StepperIcon}>
              <Typography
                sx={{
                  fontFamily: "Nunito",
                  fontSize: "1.8rem",
                  fontWeight: 600,
                  lineHeight: "2.3rem",
                  letterSpacing: "0rem",
                  textAlign: "left",
                  color: "#0E8750",
                }}
              >
                {step.label}
              </Typography>
            </StepLabel>
            <StepContent>
              <Typography
                sx={{
                  fontFamily: "Nunito",
                  fontSize: "1.8rem",
                  fontWeight: 600,
                  lineHeight: "2.3rem",
                  letterSpacing: "0rem",
                  textAlign: "left",
                  color: "#3F3F55",
                }}
              >
                {step.description}
              </Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
