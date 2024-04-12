import {
  Button,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  VStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Frame from "@assets/karta.png";
import { useEncounter } from "@hooks/useEncounter";
import { useTranslation } from "react-i18next";

export const EncounterModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { entity, fight, initializeEntity } = useEncounter();
  const { t } = useTranslation();
  const handleEncounter = (action: string) => {
    fight(action);
    onClose();
  };
  useEffect(() => {
    if (isOpen) {
      initializeEntity();
    }
  }, [isOpen]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => onClose()}>
        <ModalOverlay />
        <ModalContent
          aspectRatio={"479/749"}
          bgColor={"transparent"}
          p={4}
          _after={{
            content: '""',
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgImg: Frame,
            bgSize: "cover",
            position: "absolute",
            zIndex: 1,
          }}
          _before={{
            content: '""',
            position: "absolute",
            top: "70px",
            left: "10px",
            width: "100%",
            height: "100%",
            backgroundImage: `url(${entity?.image})`,
            backgroundRepeat: "no-repeat",
            zIndex: 0,
          }}
        >
          <VStack height={"100%"} justifyContent={"space-between"}>
            <Heading textAlign={"center"} color={"black"}>
              ????
            </Heading>
            <VStack height={"35%"} zIndex={4}>
              <Grid
                templateColumns={"repeat(2, 1fr)"}
                templateRows={"repeat(2, 1fr)"}
              >
                {entity?.actions.map((action) => {
                  return (
                    <GridItem>
                      <Button
                        maxW={"200px"}
                        colorScheme="orange"
                        onClick={() => handleEncounter(action)}
                      >
                        {t(action)}
                      </Button>
                    </GridItem>
                  );
                })}
              </Grid>
              <Button
                colorScheme={"gray"}
                maxW={"400px"}
                onClick={() => handleEncounter("encounter.dontKnow")}
              >
                {t("encounter.dontKnow")}
              </Button>
            </VStack>
          </VStack>
        </ModalContent>
      </Modal>
    </>
  );
};
