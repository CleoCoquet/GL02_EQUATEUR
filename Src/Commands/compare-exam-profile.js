//7
Examen.prototype.compare = function (exam1, exam2, logger) {

    fs.readFile('./profil-gift-exam/' + exam1 + '.gift', 'utf8', function (err, data) {
        if (err) {
            return logger.warn(err);
        }

        analyzer = new GiftParser();
        analyzer.parse(data);

        if (analyzer.errorCount === 0) {
            //Ajout d'une ligne "exam" dans le tableau, utile pour générer l'histogramme souhaité
            var data1 = analyzer.parsedQuestion.map(p => {
                p["exam"] = exam1;
                return p;
            })
        }


        fs.readFile('./profil-gift-exam/' + exam2 + '.gift', 'utf8', function (err, data) {
            if (err) {
                return logger.warn(err);
            }

            analyzer2 = new GiftParser();
            analyzer2.parse(data);

            if (analyzer2.errorCount === 0) {
                //Ajout d'une ligne "exam" dans le tableau, utile pour générer l'histogramme souhaité
                var data2 = analyzer2.parsedQuestion.map(p => {
                    p["exam"] = exam2;
                    return p;
                })
            }

        }
        
    
    );
    }
    );
}
